interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean; // Full-width option
  bordered?: boolean; // Border option
}

const Container = ({
  children,
  className,
  fluid,
  bordered,
}: ContainerProps) => {
  return (
    <div
      className={`
          ${fluid ? "w-full" : "max-w-7xl"} 
          mx-auto px-4 sm:px-6 lg:px-8 
          ${bordered ? "border border-gray-300 rounded-lg shadow-md p-6" : ""}
          ${className}
        `}
    >
      {children}
    </div>
  );
};

export default Container;
