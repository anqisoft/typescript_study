Attribute VB_Name = "vbaUTF8"
Option Explicit

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
Public Function WriteUTF8File(strInput As String, strFile As String, Optional bBOM As Boolean = True)
    Dim iFilenum As Long
    iFilenum = FreeFile()
    
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
 
    TLen = Len(strInput)
    lngBufferSize = TLen * 3 + 1
    ReDim ReturnByte(lngBufferSize - 1)
    lngResult = WideCharToMultiByte(CP_UTF8, 0, StrPtr(strInput), TLen, _
        ReturnByte(0), lngBufferSize, vbNullString, 0)
    If lngResult Then
        lngResult = lngResult - 1
        ReDim Preserve ReturnByte(lngResult)
        Open strFile For Binary As #iFilenum
        If bBOM = True Then
            bByte = 239
            Put #iFilenum, , bByte
            bByte = 187
            Put #iFilenum, , bByte
            bByte = 191
            Put #iFilenum, , bByte
        End If
        Put #iFilenum, , ReturnByte
        Close #iFilenum
    End If
    Exit Function
errHandle:
    MsgBox strFile & vbCrLf & Err.Description, , "错误 - " & Err.Number
    
    On Error Resume Next
    Close #iFilenum
    
    On Error GoTo 0
End Function
 
' 读取UTF8文件并转换为VBA中可读的字符串
' 输入
' strFile：UTF8格式文件的路径
Public Function ReadUTF8File(strFile As String, Optional bIgnoreError As Boolean = False) As String
    Dim iFilenum As Long
    iFilenum = FreeFile()
    
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
    Open strFile For Binary As #iFilenum
    ReDim ReturnByte(0 To LOF(1) - 1) As Byte
    ' 读取前三个字节
    Get #iFilenum, , bHeader(1)
    Get #iFilenum, , bHeader(2)
    Get #iFilenum, , bHeader(3)
    ' 判断前三个字节是否为BOM头
    If bHeader(1) = 239 And bHeader(2) = 187 And bHeader(3) = 191 Then
        For i = 3 To LOF(1) - 1
            Get #iFilenum, , ReturnByte(i - 3)
        Next i
    Else
        ReturnByte(0) = bHeader(1)
        ReturnByte(1) = bHeader(2)
        ReturnByte(2) = bHeader(3)
        For i = 3 To LOF(1) - 1
            Get #iFilenum, , ReturnByte(i)
        Next i
    End If
    ' 关闭文件
    Close #iFilenum
 
    ' 转换UTF-8数组为字符串
    lngBufferSize = UBound(ReturnByte) + 1
    strBuffer = String$(lngBufferSize, vbNullChar)
    lngResult = MultiByteToWideChar(65001, 0, ReturnByte(0), _
        lngBufferSize, StrPtr(strBuffer), lngBufferSize)
    ReadUTF8File = Left(strBuffer, lngResult)
 
    Exit Function
errHandle:
    If Not bIgnoreError Then
      MsgBox strFile & vbCrLf & Err.Description, , "错误 - " & Err.Number
    End If
    ReadUTF8File = ""
    
    On Error Resume Next
    Close #iFilenum
    
    On Error GoTo 0
End Function
 
' 读取UTF8文件测试
Private Sub ReadFileTest()
    Dim strFile As String
    Dim strContent As String
    Dim strSaveFile As String
 
    ' 获取文件名和路径
    strFile = Application.GetOpenFilename("文本文件,*.txt", , "打开文本文件")
    If strFile = "False" Then Exit Sub
    strContent = ReadUTF8File(strFile)
    If MsgBox("是否需要保存转换好的ANSI文本？", vbYesNo, "保存") = vbYes Then
        strSaveFile = Application.GetSaveAsFilename(Mid(strFile, InStrRev(strFile, "/") + 1), "文本文件,*.txt")
        If strSaveFile = "False" Then Exit Sub
        Open strSaveFile For Binary As #1
        Put #1, , strContent
        Close #1
    End If
End Sub
 
' 写入UTF8文件测试
Private Sub WriteFileTest()
    Dim strFile As String
    Dim strContent As String
 
    strContent = "这是一个UTF8文档测试"
    strFile = Application.GetSaveAsFilename("", "文本文件,*.txt")
    If strFile = "False" Then Exit Sub
    'WriteUTF8File strContent, strFile
    WriteUTF8File strContent, strFile, False
End Sub

Private Sub RemoveBom()
  Dim iRowIndex As Integer
  Dim iRowCount As Integer
  
  iRowCount = Range("A1").CurrentRegion.Rows.Count
  
  Dim sFilename As String
  Dim sContent As String
  For iRowIndex = 1 To iRowCount
    sFilename = Range("A" & CStr(iRowIndex))
    
    sContent = Trim(ReadUTF8File(sFilename))
    While Right(sContent, 1) <> "}"
      sContent = Left(sContent, Len(sContent) - 1)
    Wend
    
    Call WriteUTF8File(sContent, sFilename, False)
  Next
End Sub

