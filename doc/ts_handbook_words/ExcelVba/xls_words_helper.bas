Attribute VB_Name = "xls_words_helper"
Option Explicit

Private Const CON_MODULE_NAME = "xls_words_helper"
Private Const CON_A_TO_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

' 功能：A-Z列（无标题行）分别排序并去重
Sub SortAndRemoveDuplicates()
  Const FEATURE_NAME As String = "SortAndRemoveDuplicates"
  Call SetTempEnvironment
  
  Dim oCell As Range
  Set oCell = ActiveCell

  Dim ws As Worksheet
  Set ws = ActiveSheet
  
  Dim iWorksheetMaxRowIndex As Integer
  iWorksheetMaxRowIndex = ws.UsedRange.Rows.Count
  
  Dim iColLoop As Integer
  Dim iRowLoop As Integer
  
  Dim iMaxRowIndex As Integer
  For iColLoop = 1 To 26
    Dim sColName As String
    sColName = Mid(CON_A_TO_Z, iColLoop, 1)
    
    iMaxRowIndex = 0
    For iRowLoop = iWorksheetMaxRowIndex To 1 Step -1
      If Len(ws.Range(sColName & CStr(iRowLoop)).Value) > 0 Then
        iMaxRowIndex = iRowLoop
        Exit For
      End If
    Next
    
    If iMaxRowIndex > 1 Then
      Dim sRangeOfCurrentColumn As String
      sRangeOfCurrentColumn = sColName & "1" & ":" & sColName & CStr(iMaxRowIndex)
      
      With ws.Sort
        .SortFields.Clear
        .SortFields.Add2 Key:=Range(sRangeOfCurrentColumn), SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:=xlSortNormal
      
        .SetRange Range(sRangeOfCurrentColumn)
        .HEADER = xlNo
        .MatchCase = False
        .Orientation = xlTopToBottom
        .SortMethod = xlPinYin
        .Apply
      End With
      
      ws.Range(sRangeOfCurrentColumn).RemoveDuplicates Columns:=1, HEADER:=xlNo
    End If
  Next
  
  oCell.Activate
    
  Set ws = Nothing
  Set oCell = Nothing
  
  Call RestoreEnvironment(FEATURE_NAME, "", CON_MODULE_NAME, True)
End Sub

' 功能：查整个工作表中所有单词，写入到Word文档中
' 前提：打开欧路词典，再打开“迷你单词”（焦点放单词输入文本框中）
Sub QueryWords()
'  Const WINDOW_TITLE As String = "欧路词典"
  Const WINDOW_TITLE As String = "迷你查词"
  
  ' 先排序及去重再进行后续操作
  Call SortAndRemoveDuplicates
  
  ' 思路：
  ' 1. 创建Word进程，在当前工作簿所在文件夹新建Word文档
  ' 2. 获取当前工作表所有单元格内容，以列优先进行遍历：
  ' 1）每列如果有内容，则于Word文档中以标题1（Heading 1）格式写入此内容，然后换行
  ' 2）激活“迷你查词”窗口，输入要查询的内容，回车，等待1秒，然后键入tab（两次），Ctrl+A全选，Ctrl+C复制，再Shift+Tab两次，回到单词输入文本框。
  ' 3）往Word文档中粘贴相应内容，换行
  ' 3. 保存Word文档并关闭
  
  ' 1. 创建Word进程，在当前工作簿所在文件夹新建Word文档
  Dim oWordApplication As Word.Application
  Set oWordApplication = New Word.Application
  oWordApplication.ScreenUpdating = False
  oWordApplication.DisplayAlerts = wdAlertsNone
  
  Dim oWordDoc As Word.Document
  Set oWordDoc = oWordApplication.Documents.Add
  
  Dim lIdeHandle As Long
  lIdeHandle = FindWindow(vbNullString, WINDOW_TITLE)
    
  ' 2. 获取当前工作表所有单元格内容，以列优先进行遍历：
  Dim ws As Worksheet
  Set ws = ActiveSheet
  
  Dim iWorksheetMaxRowIndex As Integer
  iWorksheetMaxRowIndex = ws.UsedRange.Rows.Count
  
  Dim saData() As Variant
  saData = ws.Range("A1:Z" & CStr(iWorksheetMaxRowIndex)).Value
  
  Dim iColLoop As Integer
  Dim iRowLoop As Integer
  
  Dim iMaxRowIndex As Integer
  For iColLoop = 1 To 26
    Dim sColName As String
    sColName = Mid(CON_A_TO_Z, iColLoop, 1)
    
    iMaxRowIndex = 0
    For iRowLoop = iWorksheetMaxRowIndex To 1 Step -1
      If Len(saData(iRowLoop, iColLoop)) > 0 Then
        iMaxRowIndex = iRowLoop
        Exit For
      End If
    Next
    
    If iMaxRowIndex > 0 Then
      For iRowLoop = 1 To iMaxRowIndex
        Dim sFrom As String
        sFrom = Trim(saData(iRowLoop, iColLoop))
        If Len(sFrom) > 0 Then
          ' 1）每列如果有内容，则于Word文档中以标题1（Heading 1）格式写入此内容，然后换行
          With oWordApplication.Selection
            .TypeText sFrom
            .Style = oWordDoc.Styles(G_CONST_STYLE_HEADING_1)
            
            .TypeParagraph
          End With
          
          ' 2）激活“迷你查词”窗口，输入要查询的内容，回车，等待1秒，然后键入tab（两次），Ctrl+A全选，Ctrl+C复制，再Shift+Tab两次，回到单词输入文本框。
          SetForegroundWindow lIdeHandle
          Sleep 100
          
          SendKeys sFrom, True
          Sleep 100
          SendKeys "{Enter}", True
          Sleep 1000
          
          SendKeys "{Tab}", True
          Sleep 100
          SendKeys "{Tab}", True
          Sleep 100
              
          SendKeys "^a", True
          Sleep 100
          SendKeys "^c", True
          Sleep 100
          
          SendKeys "+{Tab}", True
          Sleep 100
          SendKeys "+{Tab}", True
          Sleep 100
          
          ' 3）往Word文档中粘贴相应内容，换行
          With oWordApplication.Selection
            .TypeParagraph
            Call .PasteAndFormat(wdListDontMerge)
            
            .TypeParagraph
          End With
        End If
      Next
    End If
  Next
  
  ' 3. 保存Word文档并关闭
  Call oWordDoc.SaveAs2(ActiveWorkbook.Path & "\" & Replace(ActiveDocument.Name, ".xlsx", ".docx"))
  oWordDoc.Close
  oWordApplication.Quit
  
  Set oWordDoc = Nothing
  Set oWordApplication = Nothing
  Set ws = Nothing
End Sub

' 功能：将当前工作表中所有内容导出到文本文件中（UTF8）
Sub ExportWords()
  Dim ws As Worksheet
  Set ws = ActiveSheet
  
  Dim iWorksheetMaxRowIndex As Integer
  iWorksheetMaxRowIndex = ws.UsedRange.Rows.Count
  
  Dim saData() As Variant
  saData = ws.Range("A1:Z" & CStr(iWorksheetMaxRowIndex)).Value
  
  Dim iColLoop As Integer
  Dim iRowLoop As Integer
  
  Dim sContent As String
  
  For iColLoop = 1 To 26
    For iRowLoop = 1 To iWorksheetMaxRowIndex
      Dim sCellContent As String
      sCellContent = Trim(saData(iRowLoop, iColLoop))
      If Len(sCellContent) > 0 Then
        sContent = sContent & sCellContent & vbLf
      End If
    Next
  Next
  
  Dim iContentLength As Integer
  iContentLength = Len(sContent)
  If iContentLength > 0 Then
    sCellContent = Left(sContent, iContentLength - 1)
    
    Call WriteUTF8File(sCellContent, ActiveWorkbook.Path & "\" & Replace(ActiveWorkbook.Name, ".xlsx", ".txt"))
  End If
    
  Set ws = Nothing
End Sub
