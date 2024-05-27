import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '~/constants/path'
import Button from '~/components/Button'
import { QueryConfig } from '../../ProductList'
import { Category } from '~/types/categories.types'
import classNames from 'classnames'
import InputNumber from '~/components/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from '~/types/utils.type'
import { omit } from 'lodash'
import RatingStart from '../RatingStart'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  console.log(errors)
  const onsubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['rating_filter', 'price_max', 'price_min', 'category'])).toString()
    })
  }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất Cả Danh Mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoriesItem) => {
          const isActive = category === categoriesItem._id
          return (
            <li className='py-2 pl-2' key={categoriesItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoriesItem._id
                  }).toString()
                }}
                className={classNames('px-2 relative', {
                  ' font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoriesItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng Giá</div>
        <form className='mt-2' onSubmit={onsubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameInput=' w-full rounded-sm border border-gray-300 outline-none p-1 focus:border-gray-500 focus:shadow-sm'
                    placeholder='₫ TỪ'
                    {...field}
                    classNameError='hidden'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    classNameInput=' w-full rounded-sm border border-gray-300 outline-none p-1 focus:border-gray-500 focus:shadow-sm'
                    placeholder='₫ ĐẾN'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='text-sm text-red-500 mt-1 min-h-[1rem] text-center'>{errors.price_min?.message}</div>

          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover: bg-orange/80 justify-center items-center'>
            Áp Dụng
          </Button>
        </form>
      </div>
      <div />
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStart queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='w-full bg-orange py-2 rounded-md uppercase text-white hover:bg-orange/80'
        onClick={() => handleRemoveAll()}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
