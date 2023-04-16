import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Header from "../components/header/Header";
import { useUser } from "@auth0/nextjs-auth0";
import { setFavorite, setCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Avatar,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import FavoriteItems from "../components/account/FavoriteItems";
import CartItems from "../components/account/CartItems";

const account = () => {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  const { colorMode } = useColorMode();
  const background1 = useColorModeValue("#fff", "#292929");
  const tooltip1 = useColorModeValue("#000", "#fff");
  const tooltip2 = useColorModeValue("#fff", "#4F4F4F");

  useEffect(() => {
    dispatch(setCart(JSON.parse(localStorage.getItem("cart"))));
    if (user) {
      localStorage.getItem(user.name) !== null
        ? dispatch(setFavorite(JSON.parse(localStorage.getItem(user.name))))
        : "";
    }
  }, [user]);

  if (isLoading)
    return (
      <Flex
        direction="column"
        minH="100vh"
        h="100%"
        className={
          colorMode === "light" ? "background-light" : "background-dark"
        }
      >
        <Header />
      </Flex>
    );
  if (error) return <div>{error.message}</div>;
  if (user)
    return (
      <Flex
        direction="column"
        minH="100vh"
        h="100%"
        className={
          colorMode === "light" ? "background-light" : "background-dark"
        }
      >
        <Header />
        {/* Content */}
        <Flex justifyContent="center" alignItems="center" w="100%" mt="75px">
          {/* Main Container */}
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            w="100%"
            gap={10}
            
          >
            {/* Name and Image container*/}
            {isLoading ? (
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                mb={0}
                gap={5}
              >
                <SkeletonCircle
                  size="128px"
                  startColor="#F703FE"
                  endColor="#05F5FA"
                  speed={3}
                />
                <Skeleton
                  w={250}
                  h={43}
                  startColor="#F703FE"
                  endColor="#05F5FA"
                  speed={3}
                />
              </Flex>
            ) : (
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={user.picture}
                  alt={`${user.name}'s Email Icon`}
                  rounded="50%"
                  size="2xl"
                />
                <Heading>Hello, {user.name}!</Heading>
              </Flex>
            )}{" "}
            {/* Favorites Container */}
            {isLoading ? (
              <Skeleton
                gap={5}
                rounded={15}
                minH={300}
                w="88%"
                startColor="#F703FE"
                endColor="#05F5FA"
                speed={3}
              />
            ) : (
              <FavoriteItems
                favorites={favorites}
                background1={background1}
                tooltip1={tooltip1}
                tooltip2={tooltip2}
              />
            )}
            {/* Cart Container */}
            {isLoading ? (
              <Skeleton
                gap={5}
                rounded={15}
                minH={300}
                w="88%"
                startColor="#F703FE"
                endColor="#05F5FA"
                speed={3}
              />
            ) : (
              <CartItems
                cart={cart}
                background1={background1}
                tooltip1={tooltip1}
                tooltip2={tooltip2}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    );
};

export default account;

export const getServerSideProps = withPageAuthRequired();
