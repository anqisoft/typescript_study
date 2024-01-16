Attribute VB_Name = "msoReadAndWriteFileByUtf8"
Option Explicit

' 最后更新
' 安启  180815  增加EnsurePathExists，并于WriteUTF8File中

' 【参考文章1】
' vba 读写文件，utf-8编码格式
' http://blog.csdn.net/oluckly/article/details/5772454
' 2010年07月28日 22:33:00
Public Declare Function MultiByteToWideChar Lib "kernel32" ( _
  ByVal CodePage As Long, _
  ByVal dwFlags As Long, _
  ByRef lpMultiByteStr As Any, _
  ByVal cchMultiByte As Long, _
  ByVal lpWideCharStr As Long, _
  ByVal cchWideChar As Long) As Long
Public Declare Function WideCharToMultiByte Lib "kernel32" ( _
  ByVal CodePage As Long, _
  ByVal dwFlags As Long, _
  ByVal lpWideCharStr As Long, _
  ByVal cchWideChar As Long, _
  ByRef lpMultiByteStr As Any, _
  ByVal cchMultiByte As Long, _
  ByVal lpDefaultChar As String, _
  ByVal lpUsedDefaultChar As Long) As Long
Public Const CP_UTF8 = 65001

' 将输入文本写进UTF8格式的文本文件
' 输入
' strInput：文本字符串
' strFile：保存的UTF8格式文件路径
' bBOM：True表示文件带"EFBBBF"头，False表示不带
Function WriteUTF8File(strInput As String, strFile As String, Optional bBOM As Boolean = True)
  Dim bByte As Byte
  Dim ReturnByte() As Byte
  Dim lngBufferSize As Long
  Dim lngResult As Long
  Dim TLen As Long
 
  ' 判断输入字符串是否为空
  If Len(strInput) = 0 Then Exit Function
  On Error GoTo errHandle
  ' 判断文件是否存在，如存在则删除
  If Dir(strFile) <> "" Then Kill strFile
  
  If Not EnsurePathExists(strFile) Then
    MsgBox "您可能没有权限创建“" & strFile & "”所对应文件夹，或路径有误！", vbOKOnly, "创建文件夹失败"
  End If
 
  TLen = Len(strInput)
  lngBufferSize = TLen * 3 + 1
  ReDim ReturnByte(lngBufferSize - 1)
  lngResult = WideCharToMultiByte(CP_UTF8, 0, StrPtr(strInput), TLen, _
    ReturnByte(0), lngBufferSize, vbNullString, 0)
  If lngResult Then
    lngResult = lngResult - 1
    ReDim Preserve ReturnByte(lngResult)
    Open strFile For Binary As #1
    If bBOM = True Then
      bByte = 239
      Put #1, , bByte
      bByte = 187
      Put #1, , bByte
      bByte = 191
      Put #1, , bByte
    End If
    Put #1, , ReturnByte
    Close #1
  End If
  Exit Function
errHandle:
  MsgBox Err.Description, , "错误 - " & Err.Number
End Function
 
' 读取UTF8文件并转换为VBA中可读的字符串
' 输入
' strFile：UTF8格式文件的路径
Function ReadUTF8File(strFile As String) As String
  Dim bByte As Byte
  Dim ReturnByte() As Byte
  Dim lngBufferSize As Long
  Dim strBuffer As String
  Dim lngResult As Long
  Dim bHeader(1 To 3) As Byte
  Dim i As Long
 
  On Error GoTo errHandle
  If Dir(strFile) = "" Then Exit Function
 
   ' 以二进制打开文件
  Open strFile For Binary As #1
  ReDim ReturnByte(0 To LOF(1) - 1) As Byte
  ' 读取前三个字节
  Get #1, , bHeader(1)
  Get #1, , bHeader(2)
  Get #1, , bHeader(3)
  ' 判断前三个字节是否为BOM头
  If bHeader(1) = 239 And bHeader(2) = 187 And bHeader(3) = 191 Then
    For i = 3 To LOF(1) - 1
      Get #1, , ReturnByte(i - 3)
    Next i
  Else
    ReturnByte(0) = bHeader(1)
    ReturnByte(1) = bHeader(2)
    ReturnByte(2) = bHeader(3)
    For i = 3 To LOF(1) - 1
      Get #1, , ReturnByte(i)
    Next i
  End If
  ' 关闭文件
  Close #1
 
  ' 转换UTF-8数组为字符串
  lngBufferSize = UBound(ReturnByte) + 1
  strBuffer = String$(lngBufferSize, vbNullChar)
  lngResult = MultiByteToWideChar(65001, 0, ReturnByte(0), _
    lngBufferSize, StrPtr(strBuffer), lngBufferSize)
  ReadUTF8File = Left(strBuffer, lngResult)
 
  Exit Function
errHandle:
  ' MsgBox Err.Description, , "错误 - " & Err.Number
  Debug.Print "读取文件（" & strFile & "）出错，错误码" & CStr(Err.Number) & "，错误提示" & vbCrLf & Err.Description & vbCrLf
  Close #1
  ReadUTF8File = ""
End Function

' 注意：Word里面找不到方法Application.GetOpenFilename
'' 读取UTF8文件测试
'Private Sub ReadFileTest()
'  Dim strFile As String
'  Dim strContent As String
'  Dim strSaveFile As String
'
'  ' 获取文件名和路径
'  strFile = Application.GetOpenFilename("文本文件,*.txt", , "打开文本文件")
'  If strFile = "False" Then Exit Sub
'  strContent = ReadUTF8File(strFile)
'  If MsgBox("是否需要保存转换好的ANSI文本？", vbYesNo, "保存") = vbYes Then
'    strSaveFile = Application.GetSaveAsFilename(Mid(strFile, InStrRev(strFile, "/") + 1), "文本文件,*.txt")
'    If strSaveFile = "False" Then Exit Sub
'    Open strSaveFile For Binary As #1
'    Put #1, , strContent
'    Close #1
'  End If
'End Sub
 
'' 写入UTF8文件测试
'Private Sub WriteFileTest()
'  Dim strFile As String
'  Dim strContent As String
'
'  strContent = "这是一个UTF8文档测试"
'  strFile = Application.GetSaveAsFilename("", "文本文件,*.txt")
'  If strFile = "False" Then Exit Sub
'  'WriteUTF8File strContent, strFile
'  WriteUTF8File strContent, strFile, False
'End Sub

Public Function EnsurePathExists(sFileName As String) As Boolean
  sFileName = Replace(sFileName, "\", "/")
  
'  Dim iPos As Integer
'  iPos = InStrRev(sFilename, "/")
  
'  Dim sJsPath As String
'  sJsPath = IIf(iPos = 0, "", Left(sFilename, iPos))
'
'  If Dir(sJsPath, vbDirectory) = "" Then
'  MkDir sJsPath
'  End If

  Dim saCatalogName() As String
  saCatalogName = Split(sFileName, "/")
  
  Dim iMaxIndex As Integer
  iMaxIndex = UBound(saCatalogName) - 1 ' 最后一级不处理
  Dim i As Integer
  Dim sPath As String
  
  For i = 0 To iMaxIndex
  sPath = sPath & IIf(i = 0, "", "/") & saCatalogName(i)
  If Dir(sPath, vbDirectory) = "" Then
    MkDir sPath
  End If
  Next
  
  
  EnsurePathExists = Dir(sPath, vbDirectory) <> ""
End Function
