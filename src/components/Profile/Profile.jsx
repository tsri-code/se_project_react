import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  handleAddGarment,
  clothingItems,
  onCardLike,
  onEditProfile,
  onLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddGarment={handleAddGarment}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
