---
layout: post
title: "hihoCoder#1287 - 数论一·Miller-Rabin质数测试"
date: 2016-05-17 19:00:54 +0800
comments: true
categories: [算法, hihoCoder]
---

## 题目
给定一个数字（很大），判断它是否是质数。  
具体描述请见[hihoCoder](http://hihocoder.com/problemset/problem/1287)。
<!--more-->
## 解题思路
**Miller-Rabin质数测试**是基于费马小定理的一个扩展。  
**费马小定理** `对于质数p和任意整数a，有a^p ≡ a(mod p)。对于质数p和任意正整数a < p,有a^(p-1) ≡ 1(mod p)`  
反过来，`如果一个数字p满足对任意正整数a < p,有a^(p-1) ≡ 1(mod p)，那p很有可能是质数。`这就是**Fermat测试**。  
**Miller-Rabin质数测试**在Fermat测试的基础上，增加了一个二次探测定理。  
**二次探测定理** `如果p是奇素数，则 x^2 ≡ 1(mod p)的解为 x ≡ 1 或 x ≡ p - 1(mod p)`  
如果a^(p-1) ≡ 1(mod p)成立，Miller-Rabin算法会检查p-1是否是偶数，如果p-1偶数，那么令u=(p-1)/2，继续检查a^u ≡ 1或a^u ≡ n - 1(mod n)是否满足。  
Miller-Rabin每次测试失误的概率是1/4；进行S次后，失误的概率是4<sup>-S</sup>。  
如果n < 2<sup>64</sup>，只用选取a=2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37做测试即可。（摘自[数论部分第一节：素数与素性测试](http://www.matrix67.com/blog/archives/234)）
## 时间复杂度
进行S次测试的时间复杂度为SlogN。
## 代码
```c++
#include <iostream>
#include <cmath>
//#include <ctime>
using namespace std;

long long mulRem(long long a, long long b, long long p) {
	if (b == 0)
		return 0;
	if (b == 1)
		return a % p;

	if ((b & 1) == 0)
		return mulRem((a << 1) % p, b >> 1, p);
	else
		return (mulRem((a << 1) % p, b >> 1, p) + a) % p;
}

long long powRem(long long a, long long power, long long p) {
	if (power == 0)
		return 1;
	if (power == 1)
		return a % p;
	
	if ((power & 1) == 0)
		return powRem(mulRem(a, a, p), power >> 1, p);
	else
		return mulRem(powRem(mulRem(a, a, p), power >> 1, p), a, p);
}

bool minerRabin(long long n, int S) {
	const int A[] = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 };

	if (n <= 2) {
		if (n == 2)
			return true;
		else
			return false;
	}

	if ((n & 1) == 0)
		return false;

	long long u = n - 1;
	while ((u & 1) == 0)
		u = u >> 1;

	// srand(time(NULL));
	for (int i = 0; i < S; i++) {
		long long v = u;
		// long long a = rand() % (n - 2) + 2;
		int a = A[i];
		if (a >= n)
			break;
		long long x = powRem(a, v, n);
		v = v << 1;
		while (v < n) {
			long long y = mulRem(x, x, n);
			if (y == 1 && x != 1 && x != n - 1)
				return false;
			x = y;
			v = v << 1;
		}
		if (x != 1)
			return false;
	}

	return true;
}

int main() {
	// long t1 = time(NULL);
	int t = 0;
	cin >> t;
	long long *a = new long long[t];
	for (int i = 0; i < t; i++)
		cin >> a[i];
	for (int i = 0; i < t; i++)
		cout << (minerRabin(a[i], 12) ? "Yes" : "No") << endl;
	delete[] a;
	// long t2 = time(NULL);
	// cout << t2 - t1 << "ms";
	return 0;
}
```