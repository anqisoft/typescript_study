Attribute VB_Name = "xls_typescript_study_helper"
Option Explicit
' Author: anqisoft@gmail.com
' Created on Sat Dec 18 2023 10:35:00
' Feature: Export the typescript code from current workbook.

' Feature: Export the typescript code from current worksheet.
Private Sub ExportCurrentSheetCode()
  Const COLUMN_NAME As String = "A"
  Const DATA_START_ROW As Integer = 2
  Const DATA_FIRST_CELL_ADDRESS As String = COLUMN_NAME & DATA_START_ROW
  
  Dim ws As Worksheet
  Set ws = ActiveSheet
  
  Dim iMaxLineIndex As Integer
  iMaxLineIndex = ws.Range(DATA_FIRST_CELL_ADDRESS).CurrentRegion.Rows.Count
    
  Dim iLineCount As Integer
  iLineCount = iMaxLineIndex - (DATA_START_ROW - 1)
  
  Dim saData() As Variant
  saData = ws.Range(DATA_FIRST_CELL_ADDRESS & ":" & COLUMN_NAME & CStr(iMaxLineIndex)).Value
    
  Dim sCode As String
  Dim iLineIndex As Integer
  For iLineIndex = 1 To iLineCount
    sCode = sCode & saData(iLineIndex, 1) & vbLf
  Next
  
  Call WriteUTF8File(sCode, ActiveWorkbook.Path & "\" & ws.Name & ".ts", False)
  
  Set ws = Nothing
End Sub
