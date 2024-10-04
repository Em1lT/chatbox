
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "./ui/input"

type Inputs = {
  prompt: string
}

type InputFormProps = {
  onSubmit: (message: string) => void
}

export default function InputForm(props: InputFormProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) =>  {
    props.onSubmit(data.prompt)
    reset()
  }

  return (
    <div className="w-full items-center justify-center bg-blue-500 max-w-4xl p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2">
          <Input className="flex-2" type="text" placeholder="Enter your prompt..." {...register("prompt", {required: true})} />
          <Input className="flex-1" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
