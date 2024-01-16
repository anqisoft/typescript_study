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

Sub WordChangeStyleToHeading1(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 1")
End Sub

Sub WordChangeStyleToHeading2(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 2")
End Sub

Sub WordChangeStyleToHeading3(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 3")
End Sub

Sub WordChangeStyleToHeading4(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 4")
End Sub

Sub WordChangeStyleToHeading5(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 5")
End Sub

Sub WordChangeStyleToHeading6(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 6")
End Sub

Sub WordChangeStyleToHeading7(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 7")
End Sub

Sub WordChangeStyleToHeading8(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 8")
End Sub

Sub WordChangeStyleToHeading9(wordSelection As Word.Selection)
  wordSelection.Style = wordSelection.Document.Styles("标题 9")
End Sub

Sub WordChangeStyleToNormal(wordSelection As Word.Selection)
  wordSelection.Range.Style = wordSelection.Document.Styles(wdStyleNormal)
End Sub

Sub WordRemoveNumbers(wordSelection As Word.Selection)
  wordSelection.Range.ListFormat.RemoveNumbers NumberType:=wdNumberParagraph
End Sub

'' 功能：以Word文档的正文及九级标题样式，初始化Word样式数组
'' 新建：安启 2019-10-07
'' 191008 安启 修正oaWordStyles类型到变体——原本为Word.Style，会出现类型不匹配错误（编译时）
Public Function InitWordStyles(ByRef doc As Word.Document, oaWordStyles As Variant) As Boolean
  If doc Is Nothing Then
    Exit Function
  End If

  ReDim oaWordStyles(0 To 9)
  Set oaWordStyles(0) = doc.Styles(Word.wdStyleNormal)

  Dim iLoop As Integer
  For iLoop = 1 To 9
    Set oaWordStyles(iLoop) = doc.Styles("标题 " & CStr(iLoop))
  Next
End Function
