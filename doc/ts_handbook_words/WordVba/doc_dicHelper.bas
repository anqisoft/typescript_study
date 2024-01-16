Attribute VB_Name = "doc_dicHelper"
Option Explicit
' ���ڣ�2024-01-05
' ���ߣ�����

Const CON_MODULE_NAME = "doc_dicHelper"
#Const M_CON_DEBUG = True
#Const M_CON_SIMPLE = True

' ���ܣ�ѡ���ı��ļ����򿪣���ȡ���е��ʣ�����ȥ�أ������ʲ�д���µ�Word�ĵ���
' ǰ�᣺��ŷ·�ʵ䣬�ٴ򿪡����㵥�ʡ�������ŵ��������ı����У�������ر����뷨��
Sub QueryWords()
  Call SetTempEnvironment
  Const CON_FEATURE_NAME = "QueryWords"
  
  Const WINDOW_TITLE As String = "������"
    
  Dim lIdeHandle As Long
  lIdeHandle = FindWindow(vbNullString, WINDOW_TITLE)
  If lIdeHandle = 0 Then
    MsgBox "���ȴ�ŷ·�ʵ估�����ʹ���"
  End If

  Dim items As FileDialogSelectedItems
  Dim iSourceFileCount As Integer
  Dim bChoosedSome As Boolean
  With Application.FileDialog(msoFileDialogFilePicker)
    .Title = "��ѡ��txt��ʽ�ĵ����嵥�ļ�"
    .AllowMultiSelect = True
    .Filters.Add "txt�ļ�", "*.txt", 1
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
            
            ' 3����Word�ĵ���ճ����Ӧ���ݣ�����
            With Selection
              Dim sTextFromClipboard As String
              sTextFromClipboard = GetTextFromClipboard()
            
              Dim iTimes As Integer
              iTimes = 1
              While InStr(sTextFromClipboard, vbCrLf & "�ο����� [����] [�鿴]" & vbCrLf & "������..." & vbCrLf) > 0
                iTimes = iTimes + 1
                Call QueryOneWord(sWord, lIdeHandle, 1000 * iTimes)
                sTextFromClipboard = GetTextFromClipboard()
              Wend
                
              #If M_CON_SIMPLE Then
                Dim bHasPhonetic As Boolean
                ' ���֡���������ͷ����ʱ��������
                bHasPhonetic = InStr(sTextFromClipboard, vbCrLf & "����") = 0
                
                Dim sPronounce As String
                Dim sChinese As String
                Dim saSplit() As String
                saSplit = Split(Replace(Replace(Replace(sTextFromClipboard, vbCrLf & IIf(bHasPhonetic, "��ϸ >", "����"), "��"), vbCrLf & "Ӣ������Ӣ�ʵ�" & vbCrLf, "��"), vbCrLf & "���塢���塢�����" & vbCrLf, "��"), "��")
                sPronounce = Trim(saSplit(1))
                If UBound(saSplit) = 1 Then
                  sChinese = saSplit(1)
                Else
                  sChinese = saSplit(2)
                End If
                
                sChinese = Split(FixChinese(sChinese), "��")(0)
                If InStr(sChinese, vbCrLf & "Ӣ������" & vbCrLf) > 0 Then
                  sChinese = Split(Replace(sChinese, vbCrLf & "Ӣ������" & vbCrLf, "��"), "��")(1)
                End If
                If InStr(sChinese, vbCrLf & "�ο����� [����] [�鿴]" & vbCrLf) > 0 Then
                  sChinese = Split(Replace(Replace(Split(Replace(sChinese, vbCrLf & "�ο����� [����] [�鿴]" & vbCrLf, "��"), "��")(1), vbCrLf & "���Ƶ���" & vbCrLf, "��"), vbCrLf & "�е����ߴʵ�" & vbCrLf, "��"), "��")(0)
                End If
                If InStr(sChinese, vbCrLf & "��������" & vbCrLf) > 0 Then
                  sChinese = Replace(sChinese, vbCrLf & "��������" & vbCrLf, "")
                End If
                sChinese = Trim(Replace(sChinese, sWord, "~"))
                While Left(sChinese, 2) = vbCrLf
                  sChinese = Right(sChinese, Len(sChinese) - 2)
                Wend
                While Right(sChinese, 2) = vbCrLf
                  sChinese = Left(sChinese, Len(sChinese) - 2)
                Wend
                
'                .TypeText sChinese
'                ' �����ᶪʧ�����������ַ���VBA��Щ�ַ��޷�ʶ��
'                If Len(sPronounce) > 0 Then
'                  .TypeText Replace(Left(sPronounce, InStrRev(sPronounce, "/")), vbCrLf, "��") ' sPronounce
'                End If


                If bHasPhonetic Then
'                  .TypeParagraph
                  
                  ' ����ʽճ�����ٻص��������ĺ�
                  .PasteAndFormat (wdFormatOriginalFormatting)
                  Application.GoBack

                  .MoveDown Unit:=wdLine, Count:=2, Extend:=wdExtend
                  .Delete Unit:=wdCharacter, Count:=1
                  .EndKey Unit:=wdLine
                  .EndKey Unit:=wdStory, Extend:=wdExtend
                  .Delete Unit:=wdCharacter, Count:=2
                End If
              #Else
                ' ����ʽճ��
                .PasteAndFormat (wdFormatOriginalFormatting)
                
  '              ' ����ճ�������ݽ������ļ���
  '              Application.GoBack
  '              .EndKey Unit:=wdStory, Extend:=wdExtend
  '              .Paragraphs.OutlineDemoteToBody
  
                ' ����ճ�������ݽ���������
                Application.GoBack
                .EndKey Unit:=wdStory, Extend:=wdExtend
                Call GoLevel(3)
  
                .EndKey Unit:=wdStory
              #End If
              
              ' ������һ��vbCr�����Կն���ĳ���Ϊ1
              If Len(.Range.Paragraphs(1).Range.Text) > 1 Then
                .TypeParagraph
              End If
              If LCase(sChinese) = sWord Then
                Debug.Print sWord & "δ�ܷ���"
              Else
                .TypeText sChinese
              End If
              .TypeParagraph
            End With
          Next
        End If
      Next
      
      ' 3. ����Word�ĵ����ر�
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
  ' ���ĸ�ʽ���õ�5��
  With ActiveDocument.Styles("Normal").Font
    .NameFarEast = "����"
    .NameAscii = "Times New Roman"
    .NameOther = "Times New Roman"
    .Name = "Times New Roman"
    .Size = 9
  End With
  
  ' �������壺���ġ����塱�����ġ�Times New Roman��
  Selection.WholeStory
  With Selection.Font
    .NameFarEast = "����"
    .NameAscii = "Times New Roman"
    .NameOther = "Times New Roman"
    .Name = ""
  End With
  
  ' ���ö����ʽ����ǰ�κ�0��1���о࣬���������񣬲�ȥ����������
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
  
  ' ������
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
  FixChinese = Replace(Replace(sOriginal, vbCrLf & "   ��ʾȫ��  �۵�ȫ��", "��"), vbCrLf & "�����ϰ������" & vbCrLf, "��")
End Function

Private Function QueryOneWord(sWord As String, lIdeHandle As Long, Optional lSleepMillisecond As Long = 1000)
  ' 2����������ʡ����ڣ�����Ҫ��ѯ�����ݣ��س����ȴ�1�룬Ȼ�����tab�����Σ���Ctrl+Aȫѡ��Ctrl+C���ƣ���Shift+Tab���Σ��ص����������ı���
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
