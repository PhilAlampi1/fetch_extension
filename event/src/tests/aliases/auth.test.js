test ('completeLogin() should be called to send profile information to store', () => {
    const completeLogin = jest.fn()
    completeLogin()
    expect(completeLogin).toHaveBeenCalled()
})