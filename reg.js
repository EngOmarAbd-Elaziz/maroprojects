function togglePassword() {
	const passwordInput = document.getElementById("password");
	const eyeOpen = document.getElementById("eyeOpen");
	const eyeClosed = document.getElementById("eyeClosed");

	const isVisible = passwordInput.type === "text";

	passwordInput.type = isVisible ? "password" : "text";

	if (isVisible) {
		eyeOpen.style.display = "inline";
		eyeClosed.style.display = "none";
	} else {
		eyeOpen.style.display = "none";
		eyeClosed.style.display = "inline";
	}
}
