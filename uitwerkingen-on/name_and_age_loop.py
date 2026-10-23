while True:
    # ask for a name
    # enter STOP to end the program
    name = input("What is your name? ")

    # check name and print the appropriate greeting
    if name == "STOP":
        break
    elif name == "admin":
        print("You're a legend!")
    else:
        print("Hi", name)

        age = int(input("What is your age? "))

        # print the activities/responsibilities that apply to this age
        if age >= 30:
            print("You can no longer apply for student finance.")
        elif age >= 18:
            print("You're a grown-up now and are allowed to vote.")
        elif age >= 17:
            print("You can get a driving license.")
        elif age >= 16:
            print("You can drive a scooter.")
        elif age >= 13:
            print("You're allowed on social media!")
