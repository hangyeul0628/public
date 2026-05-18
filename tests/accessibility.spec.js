import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';

test.describe('웹 접근성 (Accessibility) 자동화 테스트', () => {
  test('홈페이지에 WCAG 2.0, 2.1 AA 기준을 위반하는 접근성 결함이 없어야 합니다', async ({ page }) => {
    // 1. 메인 페이지로 이동 (playwright.config.js에 설정된 baseURL 사용)
    await page.goto('/');

    // 2. 페이지의 돔 콘텐츠가 로드되고 hydration이 끝날 때까지 대기
    await page.waitForLoadState('domcontentloaded');
    
    // UI 렌더링이 완벽히 완료되도록 1초 대기
    await page.waitForTimeout(1000); 

    // 3. AxeBuilder를 사용해 접근성 분석 실행
    // WCAG 2.A, 2.AA, 2.1A, 2.1AA 및 최선의 개발 프랙티스(best-practice)를 기준으로 설정
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    const violations = accessibilityScanResults.violations;

    // 4. 위반 사항 발생 시 에러 리포트 JSON 파일 추출 및 콘솔 출력
    if (violations.length > 0) {
      const reportFileName = 'accessibility-violations.json';
      
      // JSON 파일 저장 (프로젝트 루트 디렉토리 기준)
      fs.writeFileSync(reportFileName, JSON.stringify(violations, null, 2), 'utf-8');
      console.log(`\n💾 접근성 위반 리포트가 성공적으로 저장되었습니다: ${reportFileName}\n`);
      
      console.error('\n🚨 접근성 위반 사항이 발견되었습니다! 🚨\n');
      violations.forEach((violation, index) => {
        console.error(`[결함 ${index + 1}] ID: ${violation.id} (${violation.impact?.toUpperCase() || 'UNKNOWN'})`);
        console.error(`설명: ${violation.description}`);
        console.error(`도움말 URL: ${violation.helpUrl}`);
        console.error('영향을 받는 요소들:');
        violation.nodes.forEach((node) => {
          console.error(`  - HTML: ${node.html}`);
          console.error(`    대상 Selector: ${node.target.join(', ')}`);
        });
        console.error('-'.repeat(60));
      });
    }

    // 5. 테스트 검증 (위반 사항이 0개여야 함)
    expect(violations).toEqual([]);
  });
});
