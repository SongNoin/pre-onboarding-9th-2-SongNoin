import {
  Text,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Tag,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImageCard } from "../../components/commons/Cards/ImageCard";
import { DetailModal } from "../../components/commons/Modals/DetailModal";
import { ITreavelItem } from "../../types/ITravelItem";
import { MainRangeSlider } from "./MainRangeSlider";

const SelectedSpaceOption: string[] = [];

export const MainPage = () => {
  const [travelList, setTravelList] = useState<ITreavelItem[]>([]);
  const [selectedTravelItem, setSelectedTraverItem] = useState<ITreavelItem>();
  const [priceFilterValue, setPriceFilterValueValue] = useState([0, 30000]);
  const [isFiltered, setIsFiltered] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const spaceOptions = ["서울", "강원", "부산", "대구", "제주"];

  useEffect(() => {
    getTravelList();
  }, [isFiltered]);

  async function getTravelList() {
    try {
      const travelListRes = await axios.get("./src/data/travel_data.json");

      let travelData = travelListRes.data;

      travelData = travelListRes.data.filter(
        (travelEl: ITreavelItem) =>
          travelEl.price >= priceFilterValue[0] &&
          travelEl.price <= priceFilterValue[1]
      );

      if (SelectedSpaceOption.length > 0) {
        travelData = travelData.filter((travelEl: ITreavelItem) =>
          SelectedSpaceOption.includes(travelEl.spaceCategory)
        );
      }

      setTravelList(travelData);
    } catch (error) {
      alert(error);
    }
  }

  function onClickShowDetailModal(travelItem: ITreavelItem) {
    setSelectedTraverItem(travelItem);
    onOpen();
  }

  function onClickReserve(travelItem: ITreavelItem) {
    const cart = JSON.parse(String(localStorage.getItem("cart"))) || [];
    if (cart.find((el: ITreavelItem) => el.idx === travelItem.idx)) {
      alert("이미 장바구니에 있는 상품입니다");
      return;
    }
    const newItem = { ...travelItem };

    cart.push(newItem);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 담았습니다!");
    window.dispatchEvent(new Event("storage"));
  }

  function onClickSpaceFilter(space: string) {
    if (SelectedSpaceOption.includes(space)) {
      const spaceIndex = SelectedSpaceOption.indexOf(space);
      SelectedSpaceOption.splice(spaceIndex, 1);
    } else {
      SelectedSpaceOption.push(space);
    }
    setIsFiltered((prev) => !prev);
  }

  return (
    <>
      <Flex justifyContent={"center"}>
        <Heading size="lg" marginBottom={100}>
          여행 상품 모아보기
        </Heading>
      </Flex>
      <Divider mb={50} />
      <Flex mb={"10px"} alignItems="center">
        <Text fontSize="lg" as="b" mr={10}>
          지역
        </Text>
        {spaceOptions.map((space: string) => {
          return (
            <Tag
              key={space}
              size="lg"
              variant="solid"
              colorScheme={
                SelectedSpaceOption.includes(space) ? "teal" : "gray"
              }
              mr={"3px"}
              cursor="pointer"
              onClick={() => onClickSpaceFilter(space)}
            >
              {space}
            </Tag>
          );
        })}
      </Flex>
      <Flex my={50} alignItems="center">
        <Text fontSize="lg" as="b" mr={10}>
          가격
        </Text>
        <MainRangeSlider
          onChange={(priceValue) => setPriceFilterValueValue(priceValue)}
          onChangeEnd={() => setIsFiltered((prev) => !prev)}
          value={priceFilterValue}
        />
      </Flex>
      {travelList.length === 0 ? (
        <Container centerContent>
          <Text fontSize="3xl" as={"b"}>
            상품이 없습니다!
          </Text>
        </Container>
      ) : (
        <SimpleGrid
          columns={[null, 4]}
          spacingX={"10px"}
          spacingY={"50px"}
          justifyItems="center"
        >
          {travelList.map((travelItem) => {
            return (
              <ImageCard
                key={travelItem.idx}
                idx={travelItem.idx}
                imageUrl={travelItem.mainImage}
                name={travelItem.name}
                space={travelItem.spaceCategory}
                price={travelItem.price}
                buttonText={"예약"}
                onClickCard={() => onClickShowDetailModal(travelItem)}
                onClickButton={() => onClickReserve(travelItem)}
              />
            );
          })}
        </SimpleGrid>
      )}

      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        travelItem={selectedTravelItem}
      />
    </>
  );
};
