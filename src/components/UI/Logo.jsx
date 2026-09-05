function Logo({
  className = "",
  alt = "پایدار",
}) {
  return (
    <img
      src="/images/logo.svg"
      alt={alt}
      className={className}
    />
  );
}

export default Logo;