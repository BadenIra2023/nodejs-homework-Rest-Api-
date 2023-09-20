
export const getCurrent = async (req, res) => {
    const { subscription, email } = req.user;
    
    res.json({ email,
        subscription,    
    })
}

