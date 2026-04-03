
t = int(input())
for _ in range(t):
    n, c, k = map(int, input().split())
    a = list(map(int, input().split()))
    
    a.sort()
    
    for x in a:
        if x <= c:
            c += x
        else:
            need = x - c
            if need > k:
                break
            k -= need
            c += x   
    
    print(c)