import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center w-full py-8 bg-fbg bg-opacity-30 border border-border-pizza space-y-1">
      <p className="text-center space-x-1 text-sm">
        <span>Por</span>
        <span>
          <Link
            href={"https://github.com/wfabi0"}
            className="underline underline-offset-[2.5px] font-semibold hover:text-button-hover-pizza transition duration-150"
          >
            wfabi0
          </Link>
          .
        </span>
        <span>Código disponível no</span>
        <span>
          <Link
            href={"https://github.com/FlockOfCrow/pizzaria-dona-vilma"}
            className="underline underline-offset-[2.5px] font-semibold hover:text-button-hover-pizza transition duration-150"
          >
            GitHub
          </Link>
          .
        </span>
      </p>
      <p className="text-center space-x-1 text-sm">
        <span>UI Designer:</span>
        <Link
          href={"https://github.com/joaopedrodupim"}
          className="underline underline-offset-[2.5px] font-semibold hover:text-button-hover-pizza transition duration-150"
        >
          João Pedro
        </Link>
      </p>
    </footer>
  );
}
