import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '~/utils/rules'
import Input from '~/components/Input'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '~/apis/auth.apis'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ErrorResponseApi } from '~/types/utils.type'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
type typeData = Schema
export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<typeData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<typeData, 'confirm_password'>) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<typeData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          // dùng cho trường hợp nhiều trường (> email và password)
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<typeData, 'confirm_password'>, {
                message: formError[key as keyof Omit<typeData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

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
              <Input
                type='password'
                placeholder='Nhap Lai Password'
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-8'>
                <Button
                  className='bg-orange p-4 w-full text-white hover:bg-red-600 border-none flex items-center justify-center'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='mt-5 text-center'>
                <p className='text-gray-300'>
                  Bạn đã có tài khoản? <span className='text-orange'>Đăng Nhập</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
