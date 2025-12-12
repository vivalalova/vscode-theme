# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

VS Code 色彩主題擴展，目前包含 **Lova Dark Green** 深色主題。

## 本地安裝

```bash
./ln.sh
```

## 檔案結構

- `themes/dark-green.json` - 主題定義（UI 色彩 + 語法高亮）
- `examples/` - 各語言範例檔案，用於預覽主題效果
- `package.json` - 擴展 manifest

## 開發流程

1. 編輯 `themes/dark-green.json`
2. VS Code 中 `Cmd+Shift+P` → `Developer: Reload Window` 查看變更
3. 使用 `examples/` 中的檔案測試各語言語法高亮

## 規範

- 有改動時視情況更新 CLAUDE.md 和 README.md
