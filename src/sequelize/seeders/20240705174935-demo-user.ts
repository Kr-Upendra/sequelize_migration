import { QueryInterface } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        fullname: 'John Doe',
        email: 'johndoe@user.io',
        about: 'Lorem Ipsum sit amet dollor, Lorem Ipsum sit amet dollor.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Jane Smith',
        email: 'janesmith@user.io',
        about:
          'Passionate traveler and photographer. Love to explore new places and cultures.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Alice Johnson',
        email: 'alicejohnson@user.io',
        about:
          'Developer and travel blogger. Enjoys coding and sharing travel experiences.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Bob Brown',
        email: 'bobbrown@user.io',
        about:
          'Adventure seeker and foodie. Always on the lookout for new cuisines to try.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Charlie Davis',
        email: 'charliedavis@user.io',
        about:
          'History enthusiast and writer. Loves to visit historical sites and document stories.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'Eve White',
        email: 'evewhite@user.io',
        about:
          'Nature lover and hiker. Enjoys spending time in the mountains and forests.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
