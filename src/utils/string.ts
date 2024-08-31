export function splitSpec(text: string) {
  const parts = [];
  let buffer = '';
  let insideParentheses = false;
  let insideBrackets = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '(') {
      insideParentheses = true; // 소괄호 시작
    } else if (char === ')') {
      insideParentheses = false; // 소괄호 끝
    } else if (char === '[') {
      insideBrackets = true; // 대괄호 시작
    } else if (char === ']') {
      insideBrackets = false; // 대괄호 끝
    }

    if (char === ',' && !insideParentheses && !insideBrackets) {
      // 쉼표가 괄호와 대괄호 밖에 있을 때
      parts.push(buffer.trim()); // 현재 버퍼를 결과에 추가
      buffer = ''; // 버퍼 초기화
    } else {
      buffer += char; // 버퍼에 문자 추가
    }
  }

  if (buffer) {
    parts.push(buffer.trim());
  }

  return parts;
}
