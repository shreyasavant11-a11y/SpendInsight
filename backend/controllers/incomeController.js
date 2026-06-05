

const Income=require('../models/Income');

const addIncome = async (req,res) => {
    try{
         const {title,amount,note} = req.body;
    const income =new Income({title,amount,note,user:req.user.id});
    await income.save();
    res.status(201).json(income)
    }catch(error){
        res.status(500).json({message:error.message});
    }

    };

    const getIncomes = async (req, res) => {
  try {
    const income= await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const incomes = await Income.findById(req.params.id);
    if (!incomes) return res.status(404).json({ message: 'Not found' });

    if (incomes.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const incomes = await Income.findById(req.params.id);
    if (!incomes) return res.status(404).json({ message: 'Not found' });

    if (incomes.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, amount, note } = req.body;
    const updated = await Income.findByIdAndUpdate(
      req.params.id,
      { title, amount, note },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addIncome, getIncomes, deleteIncome, updateIncome };
    


