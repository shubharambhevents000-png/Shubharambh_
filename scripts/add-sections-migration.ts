import connectDB from '../lib/mongodb';
import Section from '../models/Section';
import { generateSlug } from '../lib/section-utils';

async function addSections() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Define the sections to add
    const sectionsToAdd = [
      {
        name: 'Festival Designs',
        description: 'Celebrate every festival with our amazing design templates',
        level: 0,
        displayOrder: 1,
        showInNavbar: true,
        showInHomepage: true,
        children: [
          {
            name: 'Holi',
            description: 'Colorful Holi festival templates',
            level: 1,
            displayOrder: 1,
            showInNavbar: true,
            showInHomepage: false,
          },
          {
            name: 'Diwali',
            description: 'Festival of lights templates',
            level: 1,
            displayOrder: 2,
            showInNavbar: true,
            showInHomepage: false,
          },
          {
            name: 'Christmas',
            description: 'Festive Christmas design templates',
            level: 1,
            displayOrder: 3,
            showInNavbar: true,
            showInHomepage: false,
          }
        ]
      },
      {
        name: 'Business Templates',
        description: 'Professional business design templates for all your needs',
        level: 0,
        displayOrder: 2,
        showInNavbar: true,
        showInHomepage: true,
        children: [
          {
            name: 'Business Cards',
            description: 'Professional business card designs',
            level: 1,
            displayOrder: 1,
            showInNavbar: true,
            showInHomepage: false,
          },
          {
            name: 'Letterheads',
            description: 'Corporate letterhead templates',
            level: 1,
            displayOrder: 2,
            showInNavbar: true,
            showInHomepage: false,
          },
          {
            name: 'Brochures',
            description: 'Marketing brochure designs',
            level: 1,
            displayOrder: 3,
            showInNavbar: true,
            showInHomepage: false,
          }
        ]
      },
      {
        name: 'Social Media',
        description: 'Eye-catching social media templates',
        level: 0,
        displayOrder: 3,
        showInNavbar: true,
        showInHomepage: true,
        children: [
          {
            name: 'Instagram Posts',
            description: 'Instagram post templates',
            level: 1,
            displayOrder: 1,
            showInNavbar: true,
            showInHomepage: false,
            children: [
              {
                name: 'Stories',
                description: 'Instagram story templates',
                level: 2,
                displayOrder: 1,
                showInNavbar: true,
                showInHomepage: false,
              },
              {
                name: 'Feed Posts',
                description: 'Instagram feed post templates',
                level: 2,
                displayOrder: 2,
                showInNavbar: true,
                showInHomepage: false,
              }
            ]
          },
          {
            name: 'Facebook Posts',
            description: 'Facebook post templates',
            level: 1,
            displayOrder: 2,
            showInNavbar: true,
            showInHomepage: false,
          }
        ]
      }
    ];

    // Add sections to database
    for (const sectionData of sectionsToAdd) {
      // Check if section already exists
      let existingSection = await Section.findOne({ 
        name: sectionData.name, 
        level: sectionData.level, 
        parentId: null 
      });

      if (!existingSection) {
        // Create new parent section
        const parentSection = new Section({
          ...sectionData,
          slug: generateSlug(sectionData.name),
          isActive: true,
        });
        
        await parentSection.save();
        console.log(`Created parent section: ${sectionData.name}`);

        // Create child sections
        if (sectionData.children) {
          for (const childData of sectionData.children) {
            let existingChild = await Section.findOne({
              name: childData.name,
              level: childData.level,
              parentId: parentSection._id
            });

            if (!existingChild) {
              const childSection = new Section({
                ...childData,
                slug: generateSlug(childData.name),
                parentId: parentSection._id,
                isActive: true,
              });
              
              await childSection.save();
              console.log(`Created child section: ${childData.name}`);

              // Create grandchild sections
              if (childData.children) {
                for (const grandchildData of childData.children) {
                  let existingGrandchild = await Section.findOne({
                    name: grandchildData.name,
                    level: grandchildData.level,
                    parentId: childSection._id
                  });

                  if (!existingGrandchild) {
                    const grandchildSection = new Section({
                      ...grandchildData,
                      slug: generateSlug(grandchildData.name),
                      parentId: childSection._id,
                      isActive: true,
                    });
                    
                    await grandchildSection.save();
                    console.log(`Created grandchild section: ${grandchildData.name}`);
                  } else {
                    console.log(`Grandchild section already exists: ${grandchildData.name}`);
                  }
                }
              }
            } else {
              console.log(`Child section already exists: ${childData.name}`);
            }
          }
        }
      } else {
        console.log(`Parent section already exists: ${sectionData.name}`);
      }
    }

    // Update navbar display settings for existing sections
    await Section.updateMany(
      {
        name: { $in: ['Festival Designs', 'Business Templates', 'Social Media'] },
        level: 0
      },
      { $set: { showInNavbar: true, showInHomepage: true } }
    );

    console.log('✅ Migration completed successfully!');
    console.log(`Total sections in database: ${await Section.countDocuments()}`);

  } catch (error: any) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  addSections()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}

export default addSections;