# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

VS Code 色彩主題擴展，包含 8 個主題（6 深色 + 2 淺色）。

## 本地安裝

```bash
./ln.sh
```

## 主題列表

| 主題 | 類型 | 檔案 |
|------|------|------|
| Lova Monokai Green | 深色 | `themes/dark-green.json` |
| Lova Cursor Light | 淺色 | `themes/cursor-light.json` |
| Lova Ocean Depths | 深色 | `themes/ocean-depths.json` |
| Lova Tech Innovation | 深色 | `themes/tech-innovation.json` |
| Lova Midnight Galaxy | 深色 | `themes/midnight-galaxy.json` |
| Lova Arctic Frost | 淺色 | `themes/arctic-frost.json` |
| Lova Forest Canopy | 深色 | `themes/forest-canopy.json` |
| Lova Sunset Boulevard | 深色 | `themes/sunset-boulevard.json` |

## 檔案結構

- `themes/*.json` - 主題定義（UI 色彩 + 語法高亮）
- `examples/` - 各語言範例檔案，用於預覽主題效果
- `package.json` - 擴展 manifest

## 開發流程

1. 編輯 `themes/*.json` 中的任一主題
2. VS Code 中 `Cmd+Shift+P` → `Developer: Reload Window` 查看變更
3. 使用 `examples/` 中的檔案測試各語言語法高亮

## 規範

- 有改動時視情況更新 CLAUDE.md 和 README.md
