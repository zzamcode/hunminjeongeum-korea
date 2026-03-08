

## 수정 계획

### 1. 모달 스크롤 문제 수정 (ResponsiveModal)
현재 `ResponsiveModal`의 children에 `overflow-y-auto`가 있지만, PC Dialog의 `DialogContent`에 `max-h-[85vh]`와 `overflow-hidden`이 동시에 설정되어 있어 내부 스크롤이 제대로 작동하지 않을 수 있습니다. 모바일 Drawer도 마찬가지입니다.

**수정**: `ResponsiveModal`의 `DialogContent`와 `DrawerContent` 모두 내부 children이 스크롤 가능하도록 flex 레이아웃 적용 (`flex flex-col`, children wrapper에 `overflow-y-auto flex-1 min-h-0`).

### 2. 프로필 사진 없는 인물 3명
- **로버트 램지** (`image: null` → 이니셜 표시 중)
- **우메다 히로유키** (`image: null`)  
- **펄 벅** (`image: null`)

이 세 분은 공개 도메인 사진을 찾아 `public/images/`에 추가하고, Quotes.tsx의 해당 항목 `image` 필드를 업데이트합니다.

### 3. 세계 속의 한글 콘텐츠 추가 (HangulDay.tsx)
현재 3개 항목(찌아찌아족, TOPIK, 세종학당)에 2~3개를 추가합니다:
- **한글과 유니코드** - 유니코드에서 한글의 체계적 배치와 디지털 시대의 한글
- **해외 대학의 한국어학과** - 세계 주요 대학에서의 한국어 교육 확산
- **한류와 한글** - K-pop, K-drama를 통한 한글의 자연스러운 전파

### 수정 파일
| 파일 | 작업 |
|---|---|
| `src/components/ResponsiveModal.tsx` | 내부 스크롤 동작 수정 |
| `src/pages/Quotes.tsx` | 3명 image 경로 추가 |
| `src/pages/HangulDay.tsx` | globalReach에 2~3개 항목 추가 |
| `public/images/` | robert-ramsey.jpg, umeda-hiroyuki.jpg, pearl-buck.jpg 추가 |

