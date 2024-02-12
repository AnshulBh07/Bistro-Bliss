function reverseString(s: string) {
  let ans = "";

  for (let i = s.length - 1; i >= 0; i--) {
    ans += s[i];
  }

  return ans;
}

export const formatToCurrency: (a: number) => string = (value: number) => {
  //   if the number is between 0 to 9000
  if (value.toString().length < 5) return value.toString();

  // else reverse the string and format it
  const str: string = value.toString();
  let ans: string = "";

  const temp: string = reverseString(str);

  ans += temp.slice(0, 3) + ",";

  for (let i = 3; i < temp.length; i += 2) {
    ans += temp.slice(i, i + 2) + ",";
  }
  ans = ans.slice(0, ans.length - 1);

  ans = reverseString(ans);
  //   reversing the ans
  return ans;
};
