import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '~/utils/rules'
import Input from '~/components/Input'
import { Login } from '~/apis/auth.apis'
import { useMutation } from '@tanstack/react-query'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ResponseApi } from '~/types/utils.type'

type typeData = Omit<Schema, 'confirm_password'>
const loginschema = schema.omit(['confirm_password'])
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<typeData>({
    resolver: yupResolver(loginschema)
  })

  const LoginAccountMutation = useMutation({
    mutationFn: (body: Omit<typeData, 'confirm_password'>) => Login(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    LoginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<typeData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof typeData, {
                message: formError[key as keyof Omit<typeData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  const value = watch()
  console.log(value, errors)
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='bg-white rounded p-10' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                type='email'
                placeholder='Nhap Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                classname='mt-3'
              />
              <Input
                type='password'
                placeholder='Nhap Password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-8'>
                <button className='bg-orange p-4 w-full text-white hover:bg-red-600 border-none'>Đăng Nhập</button>
              </div>
              <div className='mt-5 text-center'>
                <p className='text-gray-300'>
                  Bạn chưa có tài khoản? <span className='text-orange'>Đăng Ký</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
