Attribute VB_Name = "doc_dicHelper"
Option Explicit
' 日期：2024-01-05
' 作者：安启

Const CON_MODULE_NAME = "doc_dicHelper"
#Const M_CON_DEBUG = True
#Const M_CON_SIMPLE = True

' 功能：选择文本文件并打开，获取所有单词，排序并去重，逐个查词并写入新的Word文档中
' 前提：打开欧路词典，再打开“迷你单词”（焦点放单词输入文本框中）——需关闭输入法！
Sub QueryWords()
  Call SetTempEnvironment
  Const CON_FEATURE_NAME = "QueryWords"
  
  Const WINDOW_TITLE As String = "迷你查词"
    
  Dim lIdeHandle As Long
  lIdeHandle = FindWindow(vbNullString, WINDOW_TITLE)
  If lIdeHandle = 0 Then
    MsgBox "请先打开欧路词典及迷你查词工具"
  End If

  Dim items As FileDialogSelectedItems
  Dim iSourceFileCount As Integer
  Dim bChoosedSome As Boolean
  With Application.FileDialog(msoFileDialogFilePicker)
    .Title = "请选择txt格式的单词清单文件"
    .AllowMultiSelect = True
    .Filters.Add "txt文件", "*.txt", 1
    .FilterIndex = 1
    If .Show = -1 Then
      Set items = .SelectedItems
      iSourceFileCount = items.Count
      bChoosedSome = iSourceFileCount > 0
    End If
  End With
  
  If Not bChoosedSome Then
    Exit Sub
  End If
  
  Dim sSourceFileName As String
  Dim iSourceFileLoop As Integer
  For iSourceFileLoop = 1 To iSourceFileCount
    sSourceFileName = items.Item(iSourceFileLoop)
      
    Dim iaWordCount(1 To 26) As Integer
    Dim iLetterLoop As Integer
    For iLetterLoop = 1 To 26
      iaWordCount(iLetterLoop) = 0
    Next
    
    Dim saWords(1 To 26, 1 To 5000) As String
    
    Dim saOriginalWord() As String
    saOriginalWord = Split(Replace(Replace(ReadUTF8File(sSourceFileName), vbCrLf, vbLf), vbCr, vbLf), vbLf)
    
    Dim iOriginalMaxIndex As Integer
    iOriginalMaxIndex = UBound(saOriginalWord)
    Dim sLastOne As String
    sLastOne = saOriginalWord(iOriginalMaxIndex)
    
    If Asc(Right(sLastOne, 3)) = 0 Then
      sLastOne = Left(sLastOne, Len(sLastOne) - 3)
      saOriginalWord(iOriginalMaxIndex) = sLastOne
    End If
    Call Sort(saOriginalWord)
    
    Dim iOriginalLoop As Integer
    For iOriginalLoop = 0 To iOriginalMaxIndex
      Dim sOriginal As String
      sOriginal = Trim(saOriginalWord(iOriginalLoop))
      While Right(sOriginal, 1) = vbCr
        
      Wend
'      #If M_CON_DEBUG Then
'        Debug.Print sOriginal
'      #End If
      
      If Len(sOriginal) > 0 Then
        Dim sFirstLetterLowerCase As String * 1
        sFirstLetterLowerCase = LCase(Left(sOriginal, 1))
        
        Dim iFirstLetterIndex As Integer
        iFirstLetterIndex = Asc(sFirstLetterLowerCase) - 96
        
        Dim bFind As Boolean
        bFind = False
        
        Dim iCurrentIndexOfSubArray As Integer
        iCurrentIndexOfSubArray = iaWordCount(iFirstLetterIndex)
        
        Dim iSearchSubArrayLoop As Integer
        For iSearchSubArrayLoop = 1 To iCurrentIndexOfSubArray
          If saWords(iFirstLetterIndex, iSearchSubArrayLoop) = sOriginal Then
            bFind = True
            Exit For
          End If
        Next
        
        If Not bFind Then
          iCurrentIndexOfSubArray = iCurrentIndexOfSubArray + 1
          iaWordCount(iFirstLetterIndex) = iCurrentIndexOfSubArray
          saWords(iFirstLetterIndex, iCurrentIndexOfSubArray) = sOriginal
        End If
      End If
    Next
    
    Dim iWordTotalCount As Integer
    For iLetterLoop = 1 To 26
      iWordTotalCount = iWordTotalCount + iaWordCount(iLetterLoop)
    Next
    
    If iWordTotalCount > 0 Then
      Dim oDoc As Word.Document
      Set oDoc = Documents.Add
'      oDoc.Activate
      
      For iLetterLoop = 1 To 26
        Dim iTrueCountOfSubArray As Integer
        iTrueCountOfSubArray = iaWordCount(iLetterLoop)
              
        If iTrueCountOfSubArray > 0 Then
          With Selection
            .Style = oDoc.Styles(G_CONST_STYLE_HEADING_1)
            .TypeText Chr(64 + iLetterLoop)
            
            .TypeParagraph
          End With
            
          Dim iSubArrayWordLoop As Integer
          For iSubArrayWordLoop = 1 To iTrueCountOfSubArray
            Dim sWord As String
            sWord = saWords(iLetterLoop, iSubArrayWordLoop)
'            #If M_CON_DEBUG Then
'              Debug.Print sWord
'            #End If
            
            With Selection
              .Style = oDoc.Styles(G_CONST_STYLE_HEADING_2)
              .TypeText sWord
              
              .TypeParagraph
              .Style = oDoc.Styles(G_CONST_STYLE_NORMAL)
            End With
            
            Call QueryOneWord(sWord, lIdeHandle)
            
            ' 3）往Word文档中粘贴相应内容，换行
            With Selection
              Dim sTextFromClipboard As String
              sTextFromClipboard = GetTextFromClipboard()
            
              Dim iTimes As Integer
              iTimes = 1
              While InStr(sTextFromClipboard, vbCrLf & "参考翻译 [复制] [查看]" & vbCrLf & "加载中..." & vbCrLf) > 0
                iTimes = iTimes + 1
                Call QueryOneWord(sWord, lIdeHandle, 1000 * iTimes)
                sTextFromClipboard = GetTextFromClipboard()
              Wend
                
              #If M_CON_SIMPLE Then
                Dim bHasPhonetic As Boolean
                ' 出现“发音”开头的行时，无音标
                bHasPhonetic = InStr(sTextFromClipboard, vbCrLf & "发音") = 0
                
                Dim sPronounce As String
                Dim sChinese As String
                Dim saSplit() As String
                saSplit = Split(Replace(Replace(Replace(sTextFromClipboard, vbCrLf & IIf(bHasPhonetic, "详细 >", "发音"), "亖"), vbCrLf & "英汉－汉英词典" & vbCrLf, "亖"), vbCrLf & "近义、反义、联想词" & vbCrLf, "亖"), "亖")
                sPronounce = Trim(saSplit(1))
                If UBound(saSplit) = 1 Then
                  sChinese = saSplit(1)
                Else
                  sChinese = saSplit(2)
                End If
                
                sChinese = Split(FixChinese(sChinese), "亖")(0)
                If InStr(sChinese, vbCrLf & "英汉翻译" & vbCrLf) > 0 Then
                  sChinese = Split(Replace(sChinese, vbCrLf & "英汉翻译" & vbCrLf, "亖"), "亖")(1)
                End If
                If InStr(sChinese, vbCrLf & "参考翻译 [复制] [查看]" & vbCrLf) > 0 Then
                  sChinese = Split(Replace(Replace(Split(Replace(sChinese, vbCrLf & "参考翻译 [复制] [查看]" & vbCrLf, "亖"), "亖")(1), vbCrLf & "近似单词" & vbCrLf, "亖"), vbCrLf & "有道在线词典" & vbCrLf, "亖"), "亖")(0)
                End If
                If InStr(sChinese, vbCrLf & "网络释义" & vbCrLf) > 0 Then
                  sChinese = Replace(sChinese, vbCrLf & "网络释义" & vbCrLf, "")
                End If
                sChinese = Trim(Replace(sChinese, sWord, "~"))
                While Left(sChinese, 2) = vbCrLf
                  sChinese = Right(sChinese, Len(sChinese) - 2)
                Wend
                While Right(sChinese, 2) = vbCrLf
                  sChinese = Left(sChinese, Len(sChinese) - 2)
                Wend
                
'                .TypeText sChinese
'                ' 这样会丢失音标中特殊字符（VBA有些字符无法识别）
'                If Len(sPronounce) > 0 Then
'                  .TypeText Replace(Left(sPronounce, InStrRev(sPronounce, "/")), vbCrLf, "，") ' sPronounce
'                End If


                If bHasPhonetic Then
'                  .TypeParagraph
                  
                  ' 带格式粘贴，再回到中文译文后
                  .PasteAndFormat (wdFormatOriginalFormatting)
                  Application.GoBack

                  .MoveDown Unit:=wdLine, Count:=2, Extend:=wdExtend
                  .Delete Unit:=wdCharacter, Count:=1
                  .EndKey Unit:=wdLine
                  .EndKey Unit:=wdStory, Extend:=wdExtend
                  .Delete Unit:=wdCharacter, Count:=2
                End If
              #Else
                ' 带格式粘贴
                .PasteAndFormat (wdFormatOriginalFormatting)
                
  '              ' 将刚粘贴的内容降到正文级别
  '              Application.GoBack
  '              .EndKey Unit:=wdStory, Extend:=wdExtend
  '              .Paragraphs.OutlineDemoteToBody
  
                ' 将刚粘贴的内容降到第三级
                Application.GoBack
                .EndKey Unit:=wdStory, Extend:=wdExtend
                Call GoLevel(3)
  
                .EndKey Unit:=wdStory
              #End If
              
              ' 至少有一个vbCr，所以空段落的长度为1
              If Len(.Range.Paragraphs(1).Range.Text) > 1 Then
                .TypeParagraph
              End If
              If LCase(sChinese) = sWord Then
                Debug.Print sWord & "未能翻译"
              Else
                .TypeText sChinese
              End If
              .TypeParagraph
            End With
          Next
        End If
      Next
      
      ' 3. 保存Word文档并关闭
      Call SetStyle
      Call oDoc.SaveAs2(Replace(sSourceFileName, ".txt", ".docx"))
      oDoc.Close SaveChanges:=False
    End If
    Erase saWords
  Next
  
  Set oDoc = Nothing
  Call RestoreEnvironment(CON_FEATURE_NAME, "", CON_MODULE_NAME, True)
End Sub

Private Sub SetStyle()
  ' 正文格式设置到5号
  With ActiveDocument.Styles("Normal").Font
    .NameFarEast = "楷体"
    .NameAscii = "Times New Roman"
    .NameOther = "Times New Roman"
    .Name = "Times New Roman"
    .Size = 9
  End With
  
  ' 设置字体：中文“楷体”，西文“Times New Roman”
  Selection.WholeStory
  With Selection.Font
    .NameFarEast = "楷体"
    .NameAscii = "Times New Roman"
    .NameOther = "Times New Roman"
    .Name = ""
  End With
  
  ' 设置段落格式：段前段后0，1倍行距，不对齐网格，不去掉连续空行
  With Selection.ParagraphFormat
    .SpaceBefore = 0
    .SpaceBeforeAuto = False
    .SpaceAfter = 0
    .SpaceAfterAuto = False
    .LineSpacingRule = wdLineSpaceSingle
    .LineUnitBefore = 0
    .LineUnitAfter = 0
    .DisableLineHeightGrid = True
    .WordWrap = True
  End With
  
  ' 分三栏
  If ActiveWindow.View.SplitSpecial <> wdPaneNone Then
    ActiveWindow.Panes(2).Close
  End If
  If ActiveWindow.ActivePane.View.Type <> wdPrintView Then
    ActiveWindow.ActivePane.View.Type = wdPrintView
  End If
  With ActiveDocument.PageSetup.TextColumns
    .SetCount NumColumns:=3
    .EvenlySpaced = True
    .LineBetween = False
    .Width = CentimetersToPoints(6.59)
    .Spacing = CentimetersToPoints(0.32)
  End With
End Sub

Private Sub GoLevel(iLevel As Integer)
  With Selection.Paragraphs
    Dim iLoop As Integer
    For iLoop = 1 To 9
      .OutlineDemote
    Next
    
    For iLoop = iLevel + 1 To 9
      .OutlinePromote
    Next
  End With
End Sub


Private Sub Sort(ByRef saArray() As String, Optional bAscending As Boolean = True)
  Dim lMaxIndex As Long
  lMaxIndex = UBound(saArray)
  
  Dim lStart As Integer
  lStart = LBound(saArray) + 1
  
  Dim lLoopOuter As Long
  Dim lLoopInner As Long
  For lLoopOuter = lStart To lMaxIndex
    For lLoopInner = lStart To lMaxIndex
      Dim sPrev As String
      sPrev = saArray(lLoopInner - 1)

      Dim sNext As String
      sNext = saArray(lLoopInner)

      Select Case StrComp(sPrev, sNext, vbBinaryCompare)
      Case 1
        If bAscending Then
          saArray(lLoopInner - 1) = sNext
          saArray(lLoopInner) = sPrev
        End If
      Case -1
        If Not bAscending Then
          saArray(lLoopInner - 1) = sNext
          saArray(lLoopInner) = sPrev
        End If
  '    Case 0
      Case Else
        ' Do nothing
      End Select
    Next
  Next
End Sub

Private Sub TestSort()
  Dim saArray() As String
'  saArray = Split("a couple of,assertion,accident,absent", ",")
  saArray = Split("assertion,accident,absent,a couple of", ",")
  
  Dim lMinIndex As Long
  Dim lMaxIndex As Long
  Dim lLoop As Long
  lMinIndex = LBound(saArray)
  lMaxIndex = UBound(saArray)
  
  Debug.Print "Original"
  For lLoop = lMinIndex To lMaxIndex
    Debug.Print saArray(lLoop)
  Next
  
  Debug.Print
  Debug.Print "Call Sort(saArray, True)"
  Call Sort(saArray, True)
  For lLoop = lMinIndex To lMaxIndex
    Debug.Print saArray(lLoop)
  Next
  
  Debug.Print
  Debug.Print "Call Sort(saArray, False)"
  Call Sort(saArray, False)
  For lLoop = lMinIndex To lMaxIndex
    Debug.Print saArray(lLoop)
  Next
End Sub

Private Function FixChinese(sOriginal As String) As String
  FixChinese = Replace(Replace(sOriginal, vbCrLf & "   显示全部  折叠全部", "亖"), vbCrLf & "词组｜习惯用语" & vbCrLf, "亖")
End Function

Private Function QueryOneWord(sWord As String, lIdeHandle As Long, Optional lSleepMillisecond As Long = 1000)
  ' 2）激活“迷你查词”窗口，输入要查询的内容，回车，等待1秒，然后键入tab（两次），Ctrl+A全选，Ctrl+C复制，再Shift+Tab两次，回到单词输入文本框。
  SetForegroundWindow lIdeHandle
  Sleep 100
  
  SendKeys sWord, True
  SendKeys "{Enter}", True
  Sleep lSleepMillisecond
  
  SendKeys "{Tab 2}", True
  Sleep 10
  
  SendKeys "^a", True
  Sleep 10
  SendKeys "^c", True
  Sleep 10

  SendKeys "+{Tab}", True
  Sleep 10
  SendKeys "+{Tab}", True
  Sleep 10
  
  SendKeys "^a", True
  Sleep 10
  SendKeys "{DELETE}", True
  Sleep 10
End Function
