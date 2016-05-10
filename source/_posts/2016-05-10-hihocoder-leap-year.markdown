---
layout: post
title: "hihoCoder - 2月29日"
date: 2016-05-10 16:55:41 +0800
comments: true
categories: 算法
---

## 题目
给定两个日期，计算这两个日期之间有多少个2月29日（包括起始日期）。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1148)。
<!--more-->
## 解题思路
先简化问题，简化起始、终止年份，然后分情况讨论即可。
## 时间复杂度
时间复杂度为1。
## 代码
```c++
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

unordered_map<string, int> months;

int getMonth(string str) {
	return months[str];
}

int calYears(int start, int end) {
	if (start == end) {
		if (start % 4 == 0)
			if (start % 100 != 0 || start % 400 == 0)
				return 1;

		return 0;
	}

	int start1 = start;
	while (start1 % 4 != 0)
		start1++;
	int start2 = start1;
	while (start2 % 100 != 0)
		start2 += 4;
	int start3 = start2;
	while (start3 % 400 != 0)
		start3 += 100;

	int end1 = end;
	while (end1 % 4 != 0)
		end1--;
	int end2 = end1;
	while (end2 % 100 != 0)
		end2 -= 4;
	int end3 = end2;
	while (end3 % 400 != 0)
		end3 -= 100;

	int num1 = 0;
	if (end1 - start1 < 0)
		return 0;
	num1 = (end1 - start1) / 4 + 1;

	int num2 = 0;
	if (end2 - start2 < 0)
		num2 = 0;
	num2 = (end2 - start2) / 100 + 1;

	int num3 = 0;
	if (end3 - start3 < 0)
		num3 = 0;
	num3 = (end3 - start3) / 400 + 1;
	
	return num1 - num2 + num3;
}

int processStr(string mon, int day, int year, bool start) {
	int month = months[mon];
	if (start) {
		if (month < 2 || (month == 2 && day <= 29))
			return year;

		return year + 1;
	}
	else {
		if (month > 2 || (month == 2 && day == 29))
			return year;

		return year - 1;
	}
}

int main() {
	months["January"] = 1;
	months["February"] = 2;
	months["March"] = 3;
	months["April"] = 4;
	months["May"] = 5;
	months["June"] = 6;
	months["July"] = 7;
	months["August"] = 8;
	months["September"] = 9;
	months["October"] = 10;
	months["November"] = 11;
	months["December"] = 12;

	int T = 0;
	cin >> T;
	for (int i = 0; i < T; i++) {
		string month;
		int day;
		string comma;
		int year;
		cin >> month >> day >> comma >> year;
		int start = processStr(month, day, year, true);
		cin >> month >> day >> comma >> year;
		int end = processStr(month, day, year, false);

		cout << "Case #" << i + 1 << ": " << calYears(start, end) << endl;
	}

	return 0;
}
```