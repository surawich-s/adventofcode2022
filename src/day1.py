
# import fileinput
import fileinput
  
# Using fileinput.input() met
sum = 0
sumList = []
for line in fileinput.input(files ='day1.txt'):
    if line == '\n':
        sumList.append(sum)
        sum = 0
    else:
        sum = sum + int(line)
sumList.sort(reverse=True)
result = sumList[0]+sumList[1]+sumList[2]
print(result)