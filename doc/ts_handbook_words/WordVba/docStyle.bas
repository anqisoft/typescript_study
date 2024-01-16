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

Sub ����4()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_4)
End Sub

Sub ����5()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_5)
End Sub

Sub ����6()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_6)
End Sub

Sub ����7()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_7)
End Sub

Sub ����8()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_8)
End Sub

Sub ����9()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_9)
End Sub

Sub ����()
  Selection.Range.Style = ActiveDocument.Styles(wdStyleNormal)
End Sub

Sub ȡ���Զ����()
  Selection.Range.ListFormat.RemoveNumbers NumberType:=wdNumberParagraph
End Sub


Sub SetAllDocumentNormalStyleFontSize(fFontSize As Single)
  Dim iCount As Integer
  Dim iLoop As Integer
  
  iCount = Documents.Count
  For iLoop = 1 To iCount
    Documents(1).Activate
    With ActiveDocument.Styles("����").Font
'      .NameFarEast = "����"
'      .NameAscii = "Times New Roman"
'      .NameOther = "Times New Roman"
'      .Name = "Times New Roman"
      .Size = fFontSize
'      .Bold = False
'      .Italic = False
'      .Underline = wdUnderlineNone
'      .UnderlineColor = wdColorAutomatic
'      .StrikeThrough = False
'      .DoubleStrikeThrough = False
'      .Outline = False
'      .Emboss = False
'      .Shadow = False
'      .Hidden = False
'      .SmallCaps = False
'      .AllCaps = False
'      .Color = wdColorAutomatic
'      .Engrave = False
'      .Superscript = False
'      .Subscript = False
'      .Scaling = 100
'      .Kerning = 1
'      .Animation = wdAnimationNone
'      .DisableCharacterSpaceGrid = False
'      .EmphasisMark = wdEmphasisMarkNone
'      .Ligatures = wdLigaturesNone
'      .NumberSpacing = wdNumberSpacingDefault
'      .NumberForm = wdNumberFormDefault
'      .StylisticSet = wdStylisticSetDefault
'      .ContextualAlternates = 0
    End With
'    With ActiveDocument.Styles("����")
'      .AutomaticallyUpdate = False
'      .BaseStyle = ""
'      .NextParagraphStyle = "����"
'    End With
    ActiveDocument.Save
    Application.Run MacroName:="����������"
    ActiveDocument.Save
    ActiveWindow.Close
  Next
End Sub

Sub SetAllDocumentNormalStyleFontSizeSmallFour()
  SetAllDocumentNormalStyleFontSize (12)
End Sub

Sub SetAllDocumentNormalStyleFontSizeNormalFive()
  SetAllDocumentNormalStyleFontSize (10.5)
End Sub

Sub SetAllDocumentNormalStyleFontSizeSmallFive()
  SetAllDocumentNormalStyleFontSize (9)
End Sub


