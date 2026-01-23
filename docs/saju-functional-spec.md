
# 사주 정보 계산 및 표시 로직 기능 명세서 (Saju Calculation & Display Logic Specification)

## 1. 개요
본 문서는 사용자가 입력한 생년월일시 정보를 바탕으로 사주팔자(四柱八字)를 계산하고, 이를 리포트 페이지에 시각적으로 표현하는 로직을 정의합니다.

## 2. 입력 데이터 (Input)
사용자로부터 다음 정보를 입력받습니다:
- **이름 (Name)**: 사용자 식별용
- **생년월일 (Birth Date)**: `YYYY-MM-DD` 형식
- **양력/음력 구분 (Calendar Type)**: `solar` (양력) 또는 `lunar` (음력)
- **윤달 여부 (Leap Month)**: `boolean` (음력 선택 시 필수)
- **태어난 시간 (Birth Time Type)**: 12지시 (자시, 축시...) 또는 `야자시/조자시` 구분

## 3. 사주 계산 로직 (Calculation Logic)
사주 계산은 `src/lib/saju-calculator.ts`의 `computeSaju` 함수에서 수행됩니다.

### 3.1. 양력/음력 변환
1. 입력된 날짜가 **음력**일 경우:
   - `korean-lunar-calendar` 라이브러리를 사용하여 양력 날짜로 변환합니다.
   - 윤달 여부를 검증(`validateLeapMonth`)하여 유효하지 않은 윤달 입력 시 에러를 반환합니다.
2. 입력된 날짜가 **양력**일 경우:
   - 그대로 사용합니다.

### 3.2. 사주 4기둥(Four Pillars) 산출
변환된 양력 날짜와 시간을 기준으로 년주, 월주, 일주, 시주를 계산합니다.

- **년주(Year Pillar)**:
  - 입춘(Li Chun) 기준으로 연도가 변경됩니다. (라이브러리 내부 로직 사용)
  
- **월주(Month Pillar)**:
  - 절기(24 Solar Terms) 기준으로 월이 변경됩니다.
  
- **일주(Day Pillar)**:
  - **야자시(Ya-ja Time) 처리**: 
    - 사용자가 `야자시` (23:30 ~ 00:00)를 선택한 경우, 일진 계산 시 **다음 날**로 간주하여 일주를 계산합니다.
    - 일반 `자시` (00:00 ~ 01:30) 또는 `조자시`는 당일로 계산합니다.
    - `calculateIlju` 함수에서 이를 처리하여 정확한 간지(Gan-Zhi)를 반환합니다.

- **시주(Hour Pillar)**:
  - 사용자가 선택한 시간대(`birth_time_type`)에 매핑되는 지지(Zhi)를 결정합니다. (예: "축" -> "축")
  - 시간(Time Stem)은 일간(Day Stem)에 따라 결정되는 "시두법(時頭法)" 공식에 의해 자동 계산됩니다. (라이브러리 자동 처리)

## 4. 결과 데이터 구조 (Output Data Structure)
계산된 결과는 프론트엔드에서 다음과 같은 구조로 매핑되어 리포트에 표시됩니다.

```typescript
interface SajuData {
  year:  { chun: string, ji: string, chun_ship: string, ji_ship: string, chun_color: string, ji_color: string, woonsung: string, jijang: string },
  month: { chun: string, ji: string, chun_ship: string, ji_ship: string, chun_color: string, ji_color: string, woonsung: string, jijang: string },
  day:   { chun: string, ji: string, chun_ship: string, ji_ship: string, chun_color: string, ji_color: string, woonsung: string, jijang: string },
  hour:  { chun: string, ji: string, chun_ship: string, ji_ship: string, chun_color: string, ji_color: string, woonsung: string, jijang: string }
}
```

- **chun (천간)**: 갑, 을, 병, 정...
- **ji (지지)**: 자, 축, 인, 묘...
- **chun_ship / ji_ship (십성)**: 비견, 겁재, 식신, 상관... (일간 기준 관계)
- **chun_color / ji_color (오행 색상)**:
  - 목(木): `text-green-600`
  - 화(火): `text-red-600`
  - 토(土): `text-yellow-600`
  - 금(金): `text-gray-400` (White representation)
  - 수(水): `text-blue-600` (Black representation)
- **woonsung (12운성)**: 장생, 목욕, 관대...
- **jijang (지장간)**: 지지 속에 숨겨진 천간 (예: 인 -> 무병갑)

## 5. 리포트 표시 (Display in Report)
`WebtoonReportRenderer`의 `SajuSection`에서 다음과 같이 시각화됩니다.

1. **그리드 레이아웃**: 시주 - 일주 - 월주 - 년주 순서로 **오른쪽에서 왼쪽으로** 배치 (전통 방식).
2. **정보 계층**:
   - **메인 글자 (Big Text)**: 한자 또는 한글로 천간/지지를 크게 표시.
   - **색상 (Color)**: 오행(Wood, Fire, Earth, Metal, Water)에 따른 텍스트 색상 적용.
   - **보조 정보 (Sub Text)**: 십성(Ten Gods)을 작게 표시하여 관계성을 설명.
3. **해석 텍스트**:
   - 계산된 사주 구조(일주, 월지 등)를 바탕으로 DB(`day_pillar_profiles`, `month_branch_profiles` 등)에서 조회한 성향/특성 데이터를 LLM 프롬프트에 주입하여 생성된 맞춤형 해석 텍스트를 하단에 줄글로 제공합니다.

## 6. 예외 처리
- **생시 모름**: 시주를 추정하거나 평균적인 값을 사용하지 않고, 시주 관련 해석을 생략하거나 "알 수 없음"으로 표기하는 로직이 필요할 수 있습니다. (현재는 입력 필수)
- **윤달 오류**: 해당 연도에 윤달이 없는데 윤달을 선택한 경우 입력 단계에서 차단합니다.
