# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

VS Code 色彩主題擴展，包含 18 個主題（9 深色 + 9 淺色）。

## 本地安裝

```bash
npm run install:ext
```

## 主題列表

| 主題                        | 類型 | 檔案                                 |
| --------------------------- | ---- | ------------------------------------ |
| Monokai Green Light         | 淺色 | `themes/monokai-green-light.json`    |
| Monokai Green Dark          | 深色 | `themes/monokai-green-dark.json`     |
| Ocean Depths Light          | 淺色 | `themes/ocean-depths-light.json`     |
| Ocean Depths Dark           | 深色 | `themes/ocean-depths-dark.json`      |
| Tech Innovation Light       | 淺色 | `themes/tech-innovation-light.json`  |
| Tech Innovation Dark        | 深色 | `themes/tech-innovation-dark.json`   |
| Midnight Galaxy Light       | 淺色 | `themes/midnight-galaxy-light.json`  |
| Midnight Galaxy Dark        | 深色 | `themes/midnight-galaxy-dark.json`   |
| Arctic Frost Light          | 淺色 | `themes/arctic-frost-light.json`     |
| Arctic Frost Dark           | 深色 | `themes/arctic-frost-dark.json`      |
| Forest Canopy Light         | 淺色 | `themes/forest-canopy-light.json`    |
| Forest Canopy Dark          | 深色 | `themes/forest-canopy-dark.json`     |
| Sunset Boulevard Light      | 淺色 | `themes/sunset-boulevard-light.json` |
| Sunset Boulevard Dark       | 深色 | `themes/sunset-boulevard-dark.json`  |
| Terminal Light              | 淺色 | `themes/terminal-light.json`         |
| Terminal Dark               | 深色 | `themes/terminal-dark.json`          |
| Crimson Ember Light         | 淺色 | `themes/crimson-ember-light.json`    |
| Crimson Ember Dark          | 深色 | `themes/crimson-ember-dark.json`     |

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
