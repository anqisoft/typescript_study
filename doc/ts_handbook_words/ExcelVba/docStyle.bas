Attribute VB_Name = "docStyle"
Option Explicit
' ע�⣺����ݵ�ǰ��ʹ�õ�Office���Զ��л����룡

' Application.Language = 1033
Global Const G_CONST_STYLE_NORMAL As String = "Normal"
Global Const G_CONST_STYLE_HEADING_1 As String = "Heading 1"
Global Const G_CONST_STYLE_HEADING_2 As String = "Heading 2"
Global Const G_CONST_STYLE_HEADING_3 As String = "Heading 3"
Global Const G_CONST_STYLE_HEADING_4 As String = "Heading 4"
Global Const G_CONST_STYLE_HEADING_5 As String = "Heading 5"
Global Const G_CONST_STYLE_HEADING_6 As String = "Heading 6"
Global Const G_CONST_STYLE_HEADING_7 As String = "Heading 7"
Global Const G_CONST_STYLE_HEADING_8 As String = "Heading 8"
Global Const G_CONST_STYLE_HEADING_9 As String = "Heading 9"

' Application.Language = 1052
' Global Const G_CONST_STYLE_HEADING_1 As String = "���� 1"
' Global Const G_CONST_STYLE_HEADING_2 As String = "���� 2"
' Global Const G_CONST_STYLE_HEADING_3 As String = "���� 3"
' Global Const G_CONST_STYLE_HEADING_4 As String = "���� 4"
' Global Const G_CONST_STYLE_HEADING_5 As String = "���� 5"
' Global Const G_CONST_STYLE_HEADING_6 As String = "���� 6"
' Global Const G_CONST_STYLE_HEADING_7 As String = "���� 7"
' Global Const G_CONST_STYLE_HEADING_8 As String = "���� 8"
' Global Const G_CONST_STYLE_HEADING_9 As String = "���� 9"

Sub WordChangeStyleToHeading1(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 1")
End Sub

Sub WordChangeStyleToHeading2(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 2")
End Sub

Sub WordChangeStyleToHeading3(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 3")
End Sub

Sub WordChangeStyleToHeading4(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 4")
End Sub

Sub WordChangeStyleToHeading5(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 5")
End Sub

Sub WordChangeStyleToHeading6(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 6")
End Sub

Sub WordChangeStyleToHeading7(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 7")
End Sub

Sub WordChangeStyleToHeading8(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 8")
End Sub

Sub WordChangeStyleToHeading9(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("���� 9")
End Sub

Sub WordChangeStyleToNormal(wordSelection As Word.Selection)
  wordSelection.Range.Style = wordSelection.Document.Styles(wdStyleNormal)
End Sub

Sub WordRemoveNumbers(wordSelection As Word.Selection)
  wordSelection.Range.ListFormat.RemoveNumbers NumberType:=wdNumberParagraph
End Sub

'' ���ܣ���Word�ĵ������ļ��ż�������ʽ����ʼ��Word��ʽ����
'' �½������� 2019-10-07
'' 191008 ���� ����oaWordStyles���͵����塪��ԭ��ΪWord.Style����������Ͳ�ƥ����󣨱���ʱ��
Public Function InitWordStyles(ByRef doc As Word.Document, oaWordStyles As Variant) As Boolean
  If doc Is Nothing Then
    Exit Function
  End If

  ReDim oaWordStyles(0 To 9)
  Set oaWordStyles(0) = doc.Styles(Word.wdStyleNormal)

  Dim iLoop As Integer
  For iLoop = 1 To 9
    Set oaWordStyles(iLoop) = doc.Styles("���� " & CStr(iLoop))
  Next
End Function
