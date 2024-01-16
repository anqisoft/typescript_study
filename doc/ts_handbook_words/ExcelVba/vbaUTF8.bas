Attribute VB_Name = "vbaUTF8"
Option Explicit

' ���ο�����1��
' vba ��д�ļ���utf-8�����ʽ
' http://blog.csdn.net/oluckly/article/details/5772454
' 2010��07��28�� 22:33:00
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

' �������ı�д��UTF8��ʽ���ı��ļ�
' ����
' strInput���ı��ַ���
' strFile�������UTF8��ʽ�ļ�·��
' bBOM��True��ʾ�ļ���"EFBBBF"ͷ��False��ʾ����
Public Function WriteUTF8File(strInput As String, strFile As String, Optional bBOM As Boolean = True)
    Dim iFilenum As Long
    iFilenum = FreeFile()
    
    Dim bByte As Byte
    Dim ReturnByte() As Byte
    Dim lngBufferSize As Long
    Dim lngResult As Long
    Dim TLen As Long
 
    ' �ж������ַ����Ƿ�Ϊ��
    If Len(strInput) = 0 Then Exit Function
    On Error GoTo errHandle
    ' �ж��ļ��Ƿ���ڣ��������ɾ��
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
    MsgBox strFile & vbCrLf & Err.Description, , "���� - " & Err.Number
    
    On Error Resume Next
    Close #iFilenum
    
    On Error GoTo 0
End Function
 
' ��ȡUTF8�ļ���ת��ΪVBA�пɶ����ַ���
' ����
' strFile��UTF8��ʽ�ļ���·��
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
 
     ' �Զ����ƴ��ļ�
    Open strFile For Binary As #iFilenum
    ReDim ReturnByte(0 To LOF(1) - 1) As Byte
    ' ��ȡǰ�����ֽ�
    Get #iFilenum, , bHeader(1)
    Get #iFilenum, , bHeader(2)
    Get #iFilenum, , bHeader(3)
    ' �ж�ǰ�����ֽ��Ƿ�ΪBOMͷ
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
    ' �ر��ļ�
    Close #iFilenum
 
    ' ת��UTF-8����Ϊ�ַ���
    lngBufferSize = UBound(ReturnByte) + 1
    strBuffer = String$(lngBufferSize, vbNullChar)
    lngResult = MultiByteToWideChar(65001, 0, ReturnByte(0), _
        lngBufferSize, StrPtr(strBuffer), lngBufferSize)
    ReadUTF8File = Left(strBuffer, lngResult)
 
    Exit Function
errHandle:
    If Not bIgnoreError Then
      MsgBox strFile & vbCrLf & Err.Description, , "���� - " & Err.Number
    End If
    ReadUTF8File = ""
    
    On Error Resume Next
    Close #iFilenum
    
    On Error GoTo 0
End Function
 
' ��ȡUTF8�ļ�����
Private Sub ReadFileTest()
    Dim strFile As String
    Dim strContent As String
    Dim strSaveFile As String
 
    ' ��ȡ�ļ�����·��
    strFile = Application.GetOpenFilename("�ı��ļ�,*.txt", , "���ı��ļ�")
    If strFile = "False" Then Exit Sub
    strContent = ReadUTF8File(strFile)
    If MsgBox("�Ƿ���Ҫ����ת���õ�ANSI�ı���", vbYesNo, "����") = vbYes Then
        strSaveFile = Application.GetSaveAsFilename(Mid(strFile, InStrRev(strFile, "/") + 1), "�ı��ļ�,*.txt")
        If strSaveFile = "False" Then Exit Sub
        Open strSaveFile For Binary As #1
        Put #1, , strContent
        Close #1
    End If
End Sub
 
' д��UTF8�ļ�����
Private Sub WriteFileTest()
    Dim strFile As String
    Dim strContent As String
 
    strContent = "����һ��UTF8�ĵ�����"
    strFile = Application.GetSaveAsFilename("", "�ı��ļ�,*.txt")
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

