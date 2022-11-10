import React from 'react';

import { Button, HStack, useColorModeValue } from '@chakra-ui/react';

import { CategoriesInterface } from '../../constants/interface';

function TagSection({
  categories,
  category,
  setCategory,
  setCategoryId,
}: {
  categories: CategoriesInterface[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <HStack
      py='10px'
      // position={'sticky'}
      top='0'
      // bg='clique.primaryBg'
      alignItems={'center'}
      maxW='100%'
      bg={useColorModeValue('clique.primaryBg', 'clique.primaryBg')}
    >
      <Button
        variant='ghost'
        rounded={'full'}
        bg={category === 'All' ? 'clique.base' : 'clique.grey'}
        fontFamily={'Poppins'}
        size={'sm'}
        fontWeight={400}
        px='20px'
        color={category === 'All' ? 'clique.black' : 'clique.white'}
        onClick={() => setCategory('All')}
      >
        All
      </Button>
      {categories.map((eachCategory) => (
        <Button
          variant='ghost'
          rounded={'full'}
          bg={category === eachCategory.name ? 'clique.base' : 'clique.grey'}
          fontFamily={'Poppins'}
          size={'sm'}
          px='20px'
          fontWeight={400}
          color={
            category === eachCategory.name ? 'clique.black' : 'clique.white'
          }
          key={eachCategory.name}
          onClick={() => {
            setCategory(eachCategory.name);
            setCategoryId(eachCategory._id);
          }}
        >
          {eachCategory.name}
        </Button>
      ))}
    </HStack>
  );
}

export default TagSection;
