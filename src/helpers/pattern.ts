export const namePattern = {
  value: /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/,
  message: "올바른 이름을 적어주세요.",
};

export const phonePattern = {
  value: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/,
  message: "올바른 휴대폰 번호를 입력해 주세요.",
};

export const emailPattern = {
  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  message: "올바른 이메일을 입력해 주세요.",
};
