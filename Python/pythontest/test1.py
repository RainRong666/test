# student_name = "Alex"
# age = 20
# height = 1.75
# is_beginner = False
# favorite_tool = None

# 双下划线开头和结尾的变量是私有变量，其他文件无法访问
# Python允许同一个变量的类型发生改变
# __name__="Rain"

# print(student_name)
# print(age)
# print(height)
# print(is_beginner)
# print(favorite_tool)

# print(type(student_name))
# print(type(age))
# print(type(height))
# print(type(is_beginner))
# print(type(favorite_tool))






# raw_name = "  Alice  "
# clean_name = raw_name.strip()
# lower_name = clean_name.lower()
# upper_name = clean_name.upper()

# print(clean_name)
# print(lower_name)
# print(upper_name)
# print(len(clean_name))

# raw_turns = "5"
# y=raw_turns + "1"
# print(y)
# turns = int(raw_turns)
# print(turns + 1)

# message = "max turns: " + str(turns)
# print(message)

models = ["model-a", "model-b", ""]
print(models)
print(models[0])
print(len(models))

models.append("model-c")
print(models)

request = {
    "objective": "summarize a paragraph",
    "models": models,
    "max_turns": 3,
    "seed": None,
    "priority":"normal",
}

print(request["objective"])
print(request["models"])
print(request.get("seed"))
print(request.get("missing_key", "default value"))
print(request["priority"])