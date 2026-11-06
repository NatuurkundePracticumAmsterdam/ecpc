def integers_up_to(number: int) -> list[int]:
    """List integers up to a given number.

    Return a list of integers starting from the number one and up to, but not
    including, the supplied number argument. If number is zero or negative, an
    empty list is returned.

    Args:
        number: list integers up to this number.

    Returns:
        A list containing the integers.
    """
    if number > 1:
        return list(range(1, number))
    else:
        return []
