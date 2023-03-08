import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { ITreavelItem } from "../../../types/ITravelItem";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelItem?: ITreavelItem;
}

export const DetailModal = ({
  isOpen,
  onClose,
  travelItem,
}: DetailModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{travelItem?.idx + " - " + travelItem?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          flexDirection="column"
          justifyItems="center"
        >
          <Image
            src={travelItem?.mainImage}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            mb={30}
          />
          <Text fontSize="lg" as="b">
            지역
          </Text>
          <Text mb={3}>{travelItem?.spaceCategory}</Text>
          <Text fontSize="lg" as="b">
            설명
          </Text>
          <Text mb={3}>{travelItem?.description}</Text>
          <Text fontSize="lg" as="b">
            가격
          </Text>
          <Text mb={3}>{travelItem?.price.toLocaleString("kr")}원</Text>
          <Text fontSize="lg" as="b">
            최대거래수량
          </Text>
          <Text mb={3}>{travelItem?.maximumPurchases}장</Text>
          <Text fontSize="lg" as="b">
            등록일자
          </Text>
          <Text mb={3}>{travelItem?.registrationDate}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
