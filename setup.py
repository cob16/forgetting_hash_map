from setuptools import setup

setup(
    name='forgetting_hash_map',

    version='1.0.0',
    description='A fixed size prioritised hash table, optimised for lookup',

    # # Author details
    author='cormac brady',
    author_email='cormac.brady@hotmail.co.uk',
    license='MIT',

    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.5',
    ],

    # You can just specify the packages manually here if your project is
    # simple. Or you can use find_packages().
    packages=[
        'forgetting_hash_map',
    ],

    install_requires=[],

    extras_require={
        'test': ['nose'],
    },
)