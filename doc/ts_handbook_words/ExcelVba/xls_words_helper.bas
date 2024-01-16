Attribute VB_Name = "xls_words_helper"
Option Explicit

Private Const CON_MODULE_NAME = "xls_words_helper"
Private Const CON_A_TO_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

' ���ܣ�A-Z�У��ޱ����У��ֱ�����ȥ��
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

' ���ܣ������������������е��ʣ�д�뵽Word�ĵ���
' ǰ�᣺��ŷ·�ʵ䣬�ٴ򿪡����㵥�ʡ�������ŵ��������ı����У�
Sub QueryWords()
'  Const WINDOW_TITLE As String = "ŷ·�ʵ�"
  Const WINDOW_TITLE As String = "������"
  
  ' ������ȥ���ٽ��к�������
  Call SortAndRemoveDuplicates
  
  ' ˼·��
  ' 1. ����Word���̣��ڵ�ǰ�����������ļ����½�Word�ĵ�
  ' 2. ��ȡ��ǰ���������е�Ԫ�����ݣ��������Ƚ��б�����
  ' 1��ÿ����������ݣ�����Word�ĵ����Ա���1��Heading 1����ʽд������ݣ�Ȼ����
  ' 2����������ʡ����ڣ�����Ҫ��ѯ�����ݣ��س����ȴ�1�룬Ȼ�����tab�����Σ���Ctrl+Aȫѡ��Ctrl+C���ƣ���Shift+Tab���Σ��ص����������ı���
  ' 3����Word�ĵ���ճ����Ӧ���ݣ�����
  ' 3. ����Word�ĵ����ر�
  
  ' 1. ����Word���̣��ڵ�ǰ�����������ļ����½�Word�ĵ�
  Dim oWordApplication As Word.Application
  Set oWordApplication = New Word.Application
  oWordApplication.ScreenUpdating = False
  oWordApplication.DisplayAlerts = wdAlertsNone
  
  Dim oWordDoc As Word.Document
  Set oWordDoc = oWordApplication.Documents.Add
  
  Dim lIdeHandle As Long
  lIdeHandle = FindWindow(vbNullString, WINDOW_TITLE)
    
  ' 2. ��ȡ��ǰ���������е�Ԫ�����ݣ��������Ƚ��б�����
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
          ' 1��ÿ����������ݣ�����Word�ĵ����Ա���1��Heading 1����ʽд������ݣ�Ȼ����
          With oWordApplication.Selection
            .TypeText sFrom
            .Style = oWordDoc.Styles(G_CONST_STYLE_HEADING_1)
            
            .TypeParagraph
          End With
          
          ' 2����������ʡ����ڣ�����Ҫ��ѯ�����ݣ��س����ȴ�1�룬Ȼ�����tab�����Σ���Ctrl+Aȫѡ��Ctrl+C���ƣ���Shift+Tab���Σ��ص����������ı���
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
          
          ' 3����Word�ĵ���ճ����Ӧ���ݣ�����
          With oWordApplication.Selection
            .TypeParagraph
            Call .PasteAndFormat(wdListDontMerge)
            
            .TypeParagraph
          End With
        End If
      Next
    End If
  Next
  
  ' 3. ����Word�ĵ����ر�
  Call oWordDoc.SaveAs2(ActiveWorkbook.Path & "\" & Replace(ActiveDocument.Name, ".xlsx", ".docx"))
  oWordDoc.Close
  oWordApplication.Quit
  
  Set oWordDoc = Nothing
  Set oWordApplication = Nothing
  Set ws = Nothing
End Sub

' ���ܣ�����ǰ���������������ݵ������ı��ļ��У�UTF8��
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
