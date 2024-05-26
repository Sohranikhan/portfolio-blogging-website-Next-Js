
import OtpForms from '../../../components/OtpForms/OtpForms'

const page = ({params}) => {
  const id = params.id
  return (
    <div className="w-full flex-col gap-7 h-full min-h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-start gap-3 w-full max-w-96">
     <OtpForms id={`${id}`} />
      </div>
    </div>
  )
}

export default page
