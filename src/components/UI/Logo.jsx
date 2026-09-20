function Logo({
  className = "",
  alt = "پایدار",
}) {
  return (
    <img
      src="/images/logo.png"
      alt={alt}
      className={className}
    />
  );
}

export default Logo;