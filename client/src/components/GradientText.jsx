const GradientText = ({ children }) => {
  return (
    <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#0015D6] to-[#0989FB]">
      {children}
    </span>
  );
};

export default GradientText;
