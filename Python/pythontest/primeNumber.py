# from tkinter import N


prim = []
notPrime = [False] * 105

for i in range(2,101):
    if not notPrime[i]:
        prim.append(i)
    for j in prim:
        if i*j>100:
            break
        notPrime[i*j] = True
        if i%j==0:
            break

ans = 0
for num in prim:
    ans+=num
print(ans)