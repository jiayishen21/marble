import User from "../models/userModel";
import Purchase from "../models/purchaseModel";

const getPopulatedUser = async (id: string) => {
  await Purchase.findOne() // initialize purchase model

  const user = await User.findById(id)
    .select('_id accountType firstName lastName email shares purchaseHistory verificationCode')
    .populate({
      path: 'purchaseHistory',
      select: 'price quantity createdAt'
    })
    .exec()

  return user
}

export default getPopulatedUser