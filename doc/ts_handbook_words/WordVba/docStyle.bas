Attribute VB_Name = "docStyle"
Option Explicit
' 注意：需根据当前所使用的Office语言而切换代码！

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
' Global Const G_CONST_STYLE_HEADING_1 As String = "标题 1"
' Global Const G_CONST_STYLE_HEADING_2 As String = "标题 2"
' Global Const G_CONST_STYLE_HEADING_3 As String = "标题 3"
' Global Const G_CONST_STYLE_HEADING_4 As String = "标题 4"
' Global Const G_CONST_STYLE_HEADING_5 As String = "标题 5"
' Global Const G_CONST_STYLE_HEADING_6 As String = "标题 6"
' Global Const G_CONST_STYLE_HEADING_7 As String = "标题 7"
' Global Const G_CONST_STYLE_HEADING_8 As String = "标题 8"
' Global Const G_CONST_STYLE_HEADING_9 As String = "标题 9"

Sub 标题4()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_4)
End Sub

Sub 标题5()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_5)
End Sub

Sub 标题6()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_6)
End Sub

Sub 标题7()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_7)
End Sub

Sub 标题8()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_8)
End Sub

Sub 标题9()
  Selection.Style = ActiveDocument.Styles(G_CONST_STYLE_HEADING_9)
End Sub

Sub 正文()
  Selection.Range.Style = ActiveDocument.Styles(wdStyleNormal)
End Sub

Sub 取消自动编号()
  Selection.Range.ListFormat.RemoveNumbers NumberType:=wdNumberParagraph
End Sub


Sub SetAllDocumentNormalStyleFontSize(fFontSize As Single)
  Dim iCount As Integer
  Dim iLoop As Integer
  
  iCount = Documents.Count
  For iLoop = 1 To iCount
    Documents(1).Activate
    With ActiveDocument.Styles("正文").Font
'      .NameFarEast = "楷体"
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
'    With ActiveDocument.Styles("正文")
'      .AutomaticallyUpdate = False
'      .BaseStyle = ""
'      .NextParagraphStyle = "正文"
'    End With
    ActiveDocument.Save
    Application.Run MacroName:="更新所有域"
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


