rain = False
umbrella = False

if rain and umbrella:
    print("Lucky you have your umbrella with you since it's raining.")

if rain or umbrella:
    if rain and not umbrella:
        print("You will get wet without an umbrella since it's raining.")
    if not rain and umbrella:
        print("you can use your umbrella as a walking stick since it doesn't rain")

if not rain and not umbrella:
    print("Without an umbrella there is no problem since it's not raining.")
