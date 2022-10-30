import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { Box, Center } from '@chakra-ui/react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { GetServerSideProps } from "next";
import prisma from 'lib/prisma'
import { Theme } from 'interfaces'
import Card from 'components/theme/card'

type Props = {
  themes: Theme[]
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const themesRaw = await prisma.theme.findMany()
  const themes = JSON.parse(JSON.stringify(themesRaw))
  return {
    props: {
      themes,
    },
  };
}

interface PropTypes {
  themes: Theme[]
}

const Select: NextPage<PropTypes> = ({ themes }) => {
  const [width, setWidth] = useState<number>(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    //@ts-ignore
    dots: false,
    arrows: false,
  };

  useEffect(() => {
    setWidth(window.innerWidth * 0.8)
  }, [])

  return (
    <>
      <Box pt='60px'>
        <Center color='black' mt='20px' fontWeight='bold' fontSize='2xl'>
          どのお題でボケる？
        </Center>
        <Slider {...settings}>
          {themes.map((val: any, key: any) => {
            return (
              <Card
                theme={val}
                w={width}
                key={key}
              />
            )
          })}
        </Slider>
      </Box>
    </>
  )
}

export default Select
