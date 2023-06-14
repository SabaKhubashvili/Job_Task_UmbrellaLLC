import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai"
import { Container } from "../Container"

export const Footer = () => {
  return (
    <footer className="w-full pt-[5rem] bg-darker mt-auto ">
      <Container>
        <div className="flex justify-center items-center flex-col ">

          <h1 className="text-text font-bold text-4xl text-center">Made By Saba Khubashvili</h1>

          <div className="flex self-end pb-[1rem] pt-[4rem] gap-[10px]">
            <a href="https://www.linkedin.com/in/sabakhubashvili/" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin size={30} color={'white'} />
            </a>
            <a href="https://github.com/SabaKhubashvili" target="_blank" rel="noopener noreferrer">
              <AiFillGithub size={30} color={'white'} />
            </a>
            <a href="mailto:khubashvili.saba12@gmail.com" target="_blank" rel="noopener noreferrer">
              <AiFillMail size={30} color={'white'} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
